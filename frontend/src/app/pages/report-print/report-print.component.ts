import { AsyncPipe, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import { ReportDataService } from '../../reports/services/report-data.service';
import { ReportCategory, ReportImage, ReportSummaryGroup, ReportSummaryTrait, ReportViewModel } from '../../reports/models/report.model';
import { LegacyHtmlPipe } from '../../shared/report/legacy-html.pipe';

type ReportPrintPageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'pending'; message: string; sbId: string }
  | { status: 'loaded'; report: ReportViewModel; sbId: string };

@Component({
  selector: 'app-report-print',
  standalone: true,
  imports: [AsyncPipe, LegacyHtmlPipe, NgClass, RouterLink],
  templateUrl: './report-print.component.html',
  styleUrl: './report-print.component.css'
})
export class ReportPrintComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly reportData = inject(ReportDataService);

  protected readonly state$: Observable<ReportPrintPageState> = this.route.paramMap.pipe(
    map((params) => params.get('sbId') ?? ''),
    switchMap((sbId) =>
      this.reportData.getReport(sbId).pipe(
        map((report): ReportPrintPageState => ({ status: 'loaded', report, sbId })),
        startWith({ status: 'loading' } as ReportPrintPageState),
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
          }

          if (isPendingReportError(error)) {
            return of({
              status: 'pending',
              message: '심리분석 전문가가 최종 분석 중입니다',
              sbId
            } satisfies ReportPrintPageState);
          }

          return of({
            status: 'error',
            message: getReportErrorMessage(error)
          } satisfies ReportPrintPageState);
        })
      )
    )
  );

  protected print(): void {
    window.print();
  }

  protected imageUrl(image: ReportImage): string {
    return image.url || image.imageUrl || 'assets/placeholders/house.svg';
  }

  protected imageLabel(image: ReportImage, index: number): string {
    return image.label || image.filename || `그림 ${index + 1}`;
  }

  protected categoryAverage(category: ReportCategory): number {
    if (category.metrics.length === 0) {
      return 0;
    }

    const total = category.metrics.reduce((sum, metric) => sum + metric.score, 0);
    return Math.round(total / category.metrics.length);
  }

  protected activeCount(group: ReportSummaryGroup): number {
    return group.traits.filter((trait) => trait.state !== 'inactive').length;
  }

  protected signalTraitClasses(trait: ReportSummaryTrait): string {
    if (trait.state === 'inactive') {
      return 'border-[#D8D8D0] bg-[#F3F3EE] text-[#746F60]';
    }

    if (trait.tone === 'positive') {
      return trait.state === 'severe' ? 'border-[#2F7FD1] bg-[#2F7FD1] text-white' : 'border-[#BFE3FA] bg-[#EDF8FF] text-[#087DC6]';
    }

    return trait.state === 'severe' ? 'border-[#B42318] bg-[#B42318] text-white' : 'border-[#F0C3BD] bg-[#FFF1EF] text-[#C0392F]';
  }

  protected radarGridPoints(category: ReportCategory, ratio: number): string {
    return category.metrics.map((_, index) => this.radarPoint(index, category.metrics.length, ratio)).join(' ');
  }

  protected radarScorePoints(category: ReportCategory): string {
    return category.metrics
      .map((metric, index) => this.radarPoint(index, category.metrics.length, Math.max(0, Math.min(100, metric.score)) / 100))
      .join(' ');
  }

  protected radarAxisEnd(category: ReportCategory, index: number): string {
    return this.radarPoint(index, category.metrics.length, 1);
  }

  protected radarLabelPoint(category: ReportCategory, index: number): string {
    return this.radarPoint(index, category.metrics.length, 1.18);
  }

  private radarPoint(index: number, total: number, ratio: number): string {
    const center = 120;
    const radius = 82;
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / Math.max(total, 1);
    const x = center + Math.cos(angle) * radius * ratio;
    const y = center + Math.sin(angle) * radius * ratio;

    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }
}

function isPendingReportError(error: unknown): boolean {
  return error instanceof HttpErrorResponse && error.status === 409 && error.error?.error === 'REPORT_PENDING';
}

function getReportErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 404) {
      return '해당 스케치북 ID의 리포트를 찾을 수 없습니다.';
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

    return error.error?.error || '리포트 API에서 오류가 발생했습니다.';
  }

  return '리포트를 불러올 수 없습니다.';
}
