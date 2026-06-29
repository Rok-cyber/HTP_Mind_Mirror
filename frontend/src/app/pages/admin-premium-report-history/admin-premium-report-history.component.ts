import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import {
  PremiumReportHistoryItem,
  PremiumReportHistoryResponse
} from '../../premium-report/models/premium-narrative-report.model';
import { PremiumReportDataService } from '../../premium-report/services/premium-report-data.service';

type PremiumReportHistoryState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; sbNo: string; history: PremiumReportHistoryResponse };

@Component({
  selector: 'app-admin-premium-report-history',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-premium-report-history.component.html',
  styleUrl: './admin-premium-report-history.component.css'
})
export class AdminPremiumReportHistoryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly reportData = inject(PremiumReportDataService);

  protected readonly state$: Observable<PremiumReportHistoryState> = this.route.paramMap.pipe(
    map((params) => params.get('sbNo') ?? ''),
    switchMap((sbNo) => {
      if (!/^\d+$/.test(sbNo)) {
        return of({
          status: 'error',
          message: '올바른 스케치북 번호가 아닙니다.'
        } satisfies PremiumReportHistoryState);
      }

      return this.reportData.getAdminPremiumReportHistory(sbNo).pipe(
        map((history): PremiumReportHistoryState => ({ status: 'loaded', sbNo, history })),
        startWith({ status: 'loading' } as PremiumReportHistoryState),
        catchError((error: unknown) =>
          of({
            status: 'error',
            message: resolveErrorMessage(error)
          } satisfies PremiumReportHistoryState)
        )
      );
    }),
    startWith({ status: 'loading' } as PremiumReportHistoryState)
  );

  protected totalTokens(item: PremiumReportHistoryItem): number | null {
    return item.usage?.totalTokens ?? null;
  }

  protected estimatedCost(item: PremiumReportHistoryItem): number | null {
    return item.usage?.estimatedCostUsd ?? null;
  }

  protected displayTotalTokens(item: PremiumReportHistoryItem): string {
    const totalTokens = this.totalTokens(item);
    return totalTokens === null ? '-' : totalTokens.toLocaleString('en-US');
  }

  protected displayEstimatedCost(item: PremiumReportHistoryItem): string {
    const estimatedCost = this.estimatedCost(item);
    return estimatedCost === null ? '-' : `$${estimatedCost.toFixed(6)}`;
  }
}

function resolveErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      return '관리자 권한이 필요합니다.';
    }

    if (error.status === 404) {
      return '프리미엄 리포트 기록을 찾을 수 없습니다.';
    }
  }

  return '프리미엄 리포트 기록을 불러오지 못했습니다.';
}
