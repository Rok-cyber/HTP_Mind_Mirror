import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of, startWith, switchMap, tap } from 'rxjs';

import { AdminAnalysisImage, AdminSeniorAnalysisForm, AdminService } from '../../admin/services/admin.service';
import { adminReportQueryParams, adminReportRoute } from '../../admin/utils/admin-navigation.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; form: AdminSeniorAnalysisForm; images: AdminAnalysisImage[] };

const quantitativeKeys = ['sr_1_1', 'sr_1_2', 'sr_1_3'];
const qualitativeKeys = ['sr_2_1', 'sr_2_2', 'sr_2_3', 'sr_2_4', 'sr_2_5', 'sr_3_1', 'sr_3_2', 'sr_3_3'];

@Component({
  selector: 'app-admin-senior-analysis',
  standalone: true,
  imports: [AsyncPipe, FormsModule, RouterLink],
  templateUrl: './admin-senior-analysis.component.html'
})
export class AdminSeniorAnalysisComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly adminService = inject(AdminService);

  protected readonly answers: Record<string, number> = {};
  protected activeImage: AdminAnalysisImage | null = null;
  protected summary = '';
  protected submitting = false;
  protected errorMessage = '';

  protected readonly state$ = this.route.paramMap.pipe(
    map((params) => params.get('sbNo') ?? ''),
    switchMap((sbNo) =>
      forkJoin({
        form: this.adminService.getSeniorAnalysisForm(sbNo),
        analysisData: this.adminService.getSketchbookAnalysisItems(sbNo).pipe(catchError(() => of(null)))
      }).pipe(
        tap(({ form, analysisData }) => this.initializePage(form, analysisData?.images ?? [])),
        map(({ form, analysisData }): PageState => ({ status: 'loaded', form, images: analysisData?.images ?? [] })),
        startWith({ status: 'loading' } as PageState),
        catchError((error: unknown) => of({ status: 'error', message: getSeniorLoadErrorMessage(error) } satisfies PageState))
      )
    )
  );

  protected setActiveImage(image: AdminAnalysisImage): void {
    this.activeImage = image;
  }

  protected isChecked(key: string): boolean {
    return Number(this.answers[key] ?? 0) > 0;
  }

  protected setCheckboxAnswer(key: string, event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.answers[key] = target.checked ? 1 : 0;
  }

  protected quantitativeTotal(): number {
    return quantitativeKeys.reduce((total, key) => total + Number(this.answers[key] ?? 0), 0);
  }

  protected qualitativeTotal(): number {
    return qualitativeKeys.reduce((total, key) => total + Number(this.answers[key] ?? 0), 0);
  }

  protected genderLabel(value: number | null): string {
    if (value === 0 || value === 1) {
      return value === 0 ? '남성' : '여성';
    }

    return value === 2 ? '여성' : '정보 없음';
  }

  protected submit(form: AdminSeniorAnalysisForm): void {
    if (this.submitting) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.adminService.analyzeSeniorSketchbook(form.sbNo, this.answers, this.summary).subscribe({
      next: () =>
        this.router.navigate(adminReportRoute({ sbNo: form.sbNo, slType: 5 }), {
          queryParams: adminReportQueryParams({ sbNo: form.sbNo, slType: 5 })
        }),
      error: (error: HttpErrorResponse) => {
        this.submitting = false;
        this.errorMessage = error.error?.message || error.error?.error || '노인용 분석을 완료할 수 없습니다.';
      }
    });
  }

  protected cancel(): void {
    this.router.navigate(['/admin/sketchbooks']);
  }

  private initializePage(form: AdminSeniorAnalysisForm, images: AdminAnalysisImage[]): void {
    for (const key of [...quantitativeKeys, ...qualitativeKeys]) {
      this.answers[key] = Number(form.existingAnswers[key] ?? 0);
    }

    this.summary = String(form.existingAnswers['sb_analysis_total'] ?? '');
    this.activeImage = images[0] ?? null;
    this.errorMessage = '';
    this.submitting = false;
  }
}

function getSeniorLoadErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 409) {
      return '노인용(sl_type=5) 스케치북만 이 분석 화면을 사용할 수 있습니다.';
    }

    if (error.status === 404) {
      return '스케치북을 찾을 수 없습니다.';
    }
  }

  return '노인용 분석 화면을 불러올 수 없습니다.';
}
