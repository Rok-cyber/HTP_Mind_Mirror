import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, combineLatest, finalize, map, Observable, of, startWith, switchMap, tap } from 'rxjs';

import {
  ReportCategoryKey,
  ReportReflectionAnswer,
  ReportSectionDetail,
  ReportSectionDetailMetric
} from '../../reports/models/report.model';
import { ReportDataService } from '../../reports/services/report-data.service';
import { PercentilePositionBarComponent } from '../../shared/report/percentile-position-bar/percentile-position-bar.component';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'pending'; message: string; sbId: string }
  | { status: 'loaded'; data: ReportSectionDetail; sbId: string; sectionKey: ReportCategoryKey };

interface SectionUiConfig {
  icon: string;
  fallbackSubtitle: string;
  order: number;
}

interface ReflectionChoiceOption {
  value: string;
  label: string;
}

interface ReflectionQuestion {
  key: string;
  type: 'text' | 'choice';
  label: string;
  options?: ReflectionChoiceOption[];
}

const sectionUiConfig: Record<ReportCategoryKey, SectionUiConfig> = {
  emotion: {
    icon: '정서',
    fallbackSubtitle: '정서 영역의 주요 신호를 비교해서 살펴봅니다.',
    order: 1
  },
  adaptation: {
    icon: '적응',
    fallbackSubtitle: '생활 적응과 스트레스 처리 방식을 살펴봅니다.',
    order: 2
  },
  relationship: {
    icon: '관계',
    fallbackSubtitle: '대인관계에서 나타나는 거리감과 연결 방식을 살펴봅니다.',
    order: 3
  },
  tendency: {
    icon: '성향',
    fallbackSubtitle: '사회적 성향과 행동 흐름을 살펴봅니다.',
    order: 4
  }
};

const choiceOptions: ReflectionChoiceOption[] = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' }
];

const reflectionQuestions: Record<ReportCategoryKey, ReflectionQuestion[]> = {
  emotion: [
    { key: 'emotion_self_state', type: 'text', label: '요즘 내 감정 상태를 스스로는 어떻게 느끼고 있나요?' },
    { key: 'emotion_stress_frequency', type: 'choice', label: '최근 스트레스를 얼마나 자주 느끼나요?', options: choiceOptions }
  ],
  adaptation: [
    { key: 'adaptation_daily_burden', type: 'text', label: '최근 일상에서 가장 부담되는 부분은 무엇인가요?' },
    { key: 'adaptation_rhythm_stability', type: 'choice', label: '요즘 생활 리듬은 어느 정도 안정적이라고 느끼나요?', options: choiceOptions }
  ],
  relationship: [
    { key: 'relationship_current_concern', type: 'text', label: '사람들과의 관계에서 요즘 가장 신경 쓰이는 점이 있나요?' },
    { key: 'relationship_stress_frequency', type: 'choice', label: '최근 관계 스트레스를 얼마나 자주 느끼나요?', options: choiceOptions }
  ],
  tendency: [
    { key: 'tendency_behavior_pattern', type: 'text', label: '요즘 나의 행동 패턴에서 가장 신경 쓰이는 점은 무엇인가요?' },
    { key: 'tendency_self_stability', type: 'choice', label: '요즘 스스로를 얼마나 안정적으로 느끼나요?', options: choiceOptions }
  ]
};

@Component({
  selector: 'app-report-section-detail',
  standalone: true,
  imports: [AsyncPipe, FormsModule, PercentilePositionBarComponent, RouterLink],
  templateUrl: './report-section-detail.component.html'
})
export class ReportSectionDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly reportData = inject(ReportDataService);
  protected readonly reflectionTextValues: Record<string, string> = {};
  protected readonly reflectionChoiceValues: Record<string, string> = {};
  protected reflectionSaving = false;
  protected reflectionMessage = '';
  protected reflectionError = '';
  private reflectionLoadKey = '';

  protected readonly state$: Observable<PageState> = combineLatest([this.route.paramMap, this.route.url]).pipe(
    map(([params]) => ({
      sbId: params.get('sbId') ?? '',
      sectionKey: normalizeSectionKey(params.get('sectionKey') ?? '')
    })),
    switchMap(({ sbId, sectionKey }) =>
      this.reportData.getReportSection(sbId, sectionKey).pipe(
        tap(() => {
          this.resetReflectionState(sectionKey);
          this.loadSavedReflection(sbId, sectionKey);
        }),
        map((data): PageState => ({ status: 'loaded', data, sbId, sectionKey })),
        startWith({ status: 'loading' } as PageState),
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
          }

          if (isPendingReportError(error)) {
            return of({
              status: 'pending',
              message: '심리분석 전문가가 최종 분석 중입니다',
              sbId
            } satisfies PageState);
          }

          return of({
            status: 'error',
            message: getSectionErrorMessage(error)
          } satisfies PageState);
        })
      )
    )
  );

  protected uiConfig(sectionKey: ReportCategoryKey): SectionUiConfig {
    return sectionUiConfig[sectionKey];
  }

  protected reflectionQuestions(sectionKey: ReportCategoryKey): ReflectionQuestion[] {
    return reflectionQuestions[sectionKey];
  }

  protected saveReflection(sbId: string, sectionKey: ReportCategoryKey): void {
    const answers = this.buildReflectionAnswers(sectionKey);

    this.reflectionMessage = '';
    this.reflectionError = '';

    if (answers.length === 0) {
      this.reflectionError = '저장할 답변을 입력해 주세요.';
      return;
    }

    this.reflectionSaving = true;
    this.reportData.saveReportSectionReflection(sbId, sectionKey, { answers }).pipe(
      finalize(() => {
        this.reflectionSaving = false;
      })
    ).subscribe({
      next: () => {
        this.reflectionMessage = '저장되었습니다';
      },
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
          return;
        }

        this.reflectionError = '저장 중 오류가 발생했습니다';
      }
    });
  }

  protected bandLabel(band: ReportSectionDetailMetric['band']): string {
    const labels: Record<ReportSectionDetailMetric['band'], string> = {
      stable: '안정',
      mild: '주의',
      elevated: '높음',
      high: '매우 높음'
    };

    return labels[band];
  }

  protected bandClass(band: ReportSectionDetailMetric['band']): string {
    if (band === 'stable') return 'bg-moss/10 text-moss';
    if (band === 'mild') return 'bg-saffron/20 text-ink';
    if (band === 'elevated') return 'bg-coral/10 text-coral';
    return 'bg-coral text-white';
  }

  private loadSavedReflection(sbId: string, sectionKey: ReportCategoryKey): void {
    const loadKey = `${sbId}:${sectionKey}`;
    this.reflectionLoadKey = loadKey;

    this.reportData.getReportSectionReflection(sbId, sectionKey).pipe(
      catchError(() => of({ answers: [] }))
    ).subscribe(({ answers }) => {
      if (this.reflectionLoadKey !== loadKey) {
        return;
      }

      for (const answer of answers) {
        if (answer.answerType === 'text' && typeof answer.answerText === 'string') {
          this.reflectionTextValues[answer.questionKey] = answer.answerText;
        }

        if (answer.answerType === 'choice') {
          const value = getChoiceValue(answer);

          if (value) {
            this.reflectionChoiceValues[answer.questionKey] = value;
          }
        }
      }
    });
  }

  private resetReflectionState(sectionKey: ReportCategoryKey): void {
    for (const question of reflectionQuestions[sectionKey]) {
      delete this.reflectionTextValues[question.key];
      delete this.reflectionChoiceValues[question.key];
    }

    this.reflectionMessage = '';
    this.reflectionError = '';
  }

  private buildReflectionAnswers(sectionKey: ReportCategoryKey): ReportReflectionAnswer[] {
    const answers: ReportReflectionAnswer[] = [];

    for (const question of reflectionQuestions[sectionKey]) {
      if (question.type === 'text') {
        const answerText = (this.reflectionTextValues[question.key] ?? '').trim();

        if (answerText) {
          answers.push({ questionKey: question.key, answerType: 'text', answerText });
        }

        continue;
      }

      const value = this.reflectionChoiceValues[question.key];

      if (value) {
        answers.push({ questionKey: question.key, answerType: 'choice', answerJson: { value } });
      }
    }

    return answers;
  }
}

function getChoiceValue(answer: ReportReflectionAnswer): string {
  const answerJson = answer.answerJson;

  if (typeof answerJson !== 'object' || answerJson == null || !('value' in answerJson)) {
    return '';
  }

  const value = answerJson.value;
  return typeof value === 'string' ? value : '';
}

function normalizeSectionKey(value: string): ReportCategoryKey {
  if (value === 'emotion' || value === 'adaptation' || value === 'relationship' || value === 'tendency') {
    return value;
  }

  return 'emotion';
}

function isPendingReportError(error: unknown): boolean {
  return error instanceof HttpErrorResponse && error.status === 409 && error.error?.error === 'REPORT_PENDING';
}

function getSectionErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 404) {
      return '해당 리포트 섹션을 찾을 수 없습니다.';
    }

    if (error.status === 401) {
      return '로그인이 필요합니다.';
    }

    if (error.status === 403) {
      return '이 리포트에 접근할 권한이 없습니다.';
    }

    if (error.status === 0) {
      return '리포트 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.';
    }

    return error.error?.error || '리포트 섹션 API에서 오류가 발생했습니다.';
  }

  return '리포트 섹션을 불러올 수 없습니다.';
}
