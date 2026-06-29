import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import {
  PremiumNarrativeReport,
  PremiumReportHistoryResponse,
  PremiumReportLatestResponse
} from '../models/premium-narrative-report.model';
import {
  PremiumSimilarityAnonymousMapView,
  PremiumSimilarFlowMapResponse
} from '../models/premium-similarity-map.model';

export interface PremiumReportWithSimilarFlowMap {
  response: PremiumReportLatestResponse;
  similarFlowMap: PremiumSimilarityAnonymousMapView | null;
}

@Injectable({
  providedIn: 'root'
})
export class PremiumReportDataService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly similarFlowMapPointCount = 2200;

  getMockPremiumReport(): Observable<PremiumNarrativeReport> {
    return this.http.get<PremiumNarrativeReport>('/assets/mock/sb-8169-openai-mini-report.json');
  }

  getLatestPremiumReportResponse(sbNo: number | string): Observable<PremiumReportLatestResponse> {
    return this.http.get<PremiumReportLatestResponse>(
      `${this.apiBaseUrl}/premium-reports/${encodeURIComponent(String(sbNo))}`
    );
  }

  getPremiumReportVersionResponse(sbNo: number | string, prNo: number | string): Observable<PremiumReportLatestResponse> {
    return this.http.get<PremiumReportLatestResponse>(
      `${this.apiBaseUrl}/premium-reports/${encodeURIComponent(String(sbNo))}/versions/${encodeURIComponent(String(prNo))}`
    );
  }

  getAdminPremiumReportHistory(sbNo: number | string): Observable<PremiumReportHistoryResponse> {
    return this.http.get<PremiumReportHistoryResponse>(
      `${this.apiBaseUrl}/admin/premium-reports/${encodeURIComponent(String(sbNo))}/history`
    );
  }

  getSimilarFlowMapResponse(sbNo: number | string): Observable<PremiumSimilarFlowMapResponse> {
    const params = `scanLimit=${this.similarFlowMapPointCount}&mapPointLimit=${this.similarFlowMapPointCount}`;

    return this.http.get<PremiumSimilarFlowMapResponse>(
      `${this.apiBaseUrl}/premium-reports/${encodeURIComponent(String(sbNo))}/similar-flow-map?${params}`
    );
  }

  getPremiumReportWithSimilarFlowMap(
    sbNo: number | string,
    prNo?: number | string
  ): Observable<PremiumReportWithSimilarFlowMap> {
    const response$ = prNo
      ? this.getPremiumReportVersionResponse(sbNo, prNo)
      : this.getLatestPremiumReportResponse(sbNo);

    const similarFlowMap$ = this.getSimilarFlowMapResponse(sbNo).pipe(
      map((response) => response.anonymousMapView),
      catchError(() => of(null))
    );

    return forkJoin({
      response: response$,
      similarFlowMap: similarFlowMap$
    });
  }
}
