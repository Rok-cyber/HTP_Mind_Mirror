import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { ReportDataService } from '../../reports/services/report-data.service';
import { ReportViewModel } from '../../reports/models/report.model';
import { ReportHeaderComponent } from '../../shared/layout/report-header/report-header.component';
import { ImageViewerComponent } from '../../shared/report/image-viewer/image-viewer.component';
import { LegacyHtmlPipe } from '../../shared/report/legacy-html.pipe';
import { ReportSectionComponent } from '../../shared/report/report-section/report-section.component';
import { SummaryGridComponent } from '../../shared/report/summary-grid/summary-grid.component';

type ReportPageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'pending'; message: string; sbId: string }
  | { status: 'loaded'; report: ReportViewModel; sbId: string };

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AsyncPipe, ImageViewerComponent, LegacyHtmlPipe, ReportHeaderComponent, ReportSectionComponent, RouterLink, SummaryGridComponent],
  templateUrl: './report.component.html'
})
export class ReportComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly reportData = inject(ReportDataService);
  private readonly auth = inject(AuthService);

  protected readonly sbId$ = this.route.paramMap.pipe(map((params) => params.get('sbId') ?? 'sb-1001'));
  protected readonly state$: Observable<ReportPageState> = this.sbId$.pipe(
    switchMap((sbId) =>
      this.reportData.getReport(sbId).pipe(
        map((report): ReportPageState => ({ status: 'loaded', report, sbId })),
        startWith({ status: 'loading' } as ReportPageState),
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
          }

          if (isPendingReportError(error)) {
            return of({
              status: 'pending',
              message: '심리분석 전문가가 최종 분석 중입니다',
              sbId
            } satisfies ReportPageState);
          }

          return of({
            status: 'error',
            message: getReportErrorMessage(error)
          } satisfies ReportPageState);
        })
      )
    )
  );

  protected showReanalysisButton(report: ReportViewModel): boolean {
    return this.auth.isAdmin();
  }

  protected reanalyze(sbId: string, report: ReportViewModel): void {
    this.router.navigate(['/admin/sketchbooks', sbId, this.isSeniorReport(report) ? 'analyze-senior' : 'analyze']);
  }

  private isSeniorReport(report: ReportViewModel): boolean {
    const slType = this.route.snapshot.queryParamMap.get('slType');
    return slType === '5' || report.info.type.includes('노인');
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
