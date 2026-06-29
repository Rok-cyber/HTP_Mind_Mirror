import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import { PremiumReportRendererComponent } from '../../premium-report/components/premium-report-renderer/premium-report-renderer.component';
import { PremiumNarrativeReport } from '../../premium-report/models/premium-narrative-report.model';
import { PremiumSimilarityAnonymousMapView } from '../../premium-report/models/premium-similarity-map.model';
import { PremiumReportDataService } from '../../premium-report/services/premium-report-data.service';
import { resolvePremiumReportLoadErrorMessage } from '../../premium-report/utils/premium-report-error.util';
import {
  getPremiumReportRouteParams,
  validatePremiumReportRouteParams
} from '../../premium-report/utils/premium-report-route.util';

type PremiumReportState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'loaded';
      report: PremiumNarrativeReport;
      similarFlowMap: PremiumSimilarityAnonymousMapView | null;
      sbNo: string;
      prNo?: string;
      contextLabel?: string;
    };

type LoadedPremiumReportState = Extract<PremiumReportState, { status: 'loaded' }>;

@Component({
  selector: 'app-premium-report',
  standalone: true,
  imports: [AsyncPipe, PremiumReportRendererComponent, RouterLink],
  templateUrl: './premium-report.component.html',
  styleUrl: './premium-report.component.css'
})
export class PremiumReportComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly reportData = inject(PremiumReportDataService);

  protected readonly state$: Observable<PremiumReportState> = this.route.paramMap.pipe(
    map(getPremiumReportRouteParams),
    switchMap((routeParams) => {
      const validation = validatePremiumReportRouteParams(routeParams);

      if (!validation.valid) {
        return of({
          status: 'error',
          message: validation.message
        } satisfies PremiumReportState);
      }

      const { sbNo, prNo } = validation;

      return this.reportData.getPremiumReportWithSimilarFlowMap(sbNo, prNo).pipe(
        map(
          ({ response, similarFlowMap }): PremiumReportState => ({
            status: 'loaded',
            report: response.report,
            similarFlowMap,
            sbNo,
            ...(prNo ? { prNo, contextLabel: `저장된 리포트 버전 #${response.record.prNo}` } : {})
          })
        ),
        startWith({ status: 'loading' } as PremiumReportState),
        catchError((error: unknown) =>
          of({
            status: 'error',
            message: resolvePremiumReportLoadErrorMessage(error)
          } satisfies PremiumReportState)
        )
      );
    }),
    startWith({ status: 'loading' } as PremiumReportState)
  );

  protected printRoute(state: LoadedPremiumReportState): unknown[] {
    if (this.router.url.startsWith('/my/reports/')) {
      return ['/my', 'reports', state.sbNo, 'premium', 'print'];
    }

    return state.prNo
      ? ['/premium-report', state.sbNo, 'versions', state.prNo, 'print']
      : ['/premium-report', state.sbNo, 'print'];
  }
}
