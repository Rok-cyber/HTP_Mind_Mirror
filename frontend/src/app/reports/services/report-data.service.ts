import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import { ReportApiResponse, toReportViewModel } from '../models/report-api.model';
import {
  ReportCategoryKey,
  ReportReflectionPayload,
  ReportReflectionResponse,
  ReportReflectionSaveResponse,
  ReportSectionDetail,
  ReportViewModel
} from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportDataService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getReport(sbId: string): Observable<ReportViewModel> {
    const normalizedId = encodeURIComponent(sbId.trim());

    return this.http
      .get<ReportApiResponse>(`${this.apiBaseUrl}/report/${normalizedId}`)
      .pipe(map((report) => toReportViewModel(report)));
  }

  getReportSection(sbId: string, sectionKey: ReportCategoryKey): Observable<ReportSectionDetail> {
    const normalizedId = encodeURIComponent(sbId.trim());

    return this.http.get<ReportSectionDetail>(`${this.apiBaseUrl}/report/${normalizedId}/sections/${sectionKey}`);
  }

  getReportSectionReflection(sbId: string, sectionKey: ReportCategoryKey): Observable<ReportReflectionResponse> {
    const normalizedId = encodeURIComponent(sbId.trim());

    return this.http.get<ReportReflectionResponse>(`${this.apiBaseUrl}/report/${normalizedId}/sections/${sectionKey}/reflection`);
  }

  saveReportSectionReflection(
    sbId: string,
    sectionKey: ReportCategoryKey,
    payload: ReportReflectionPayload
  ): Observable<ReportReflectionSaveResponse> {
    const normalizedId = encodeURIComponent(sbId.trim());

    return this.http.post<ReportReflectionSaveResponse>(
      `${this.apiBaseUrl}/report/${normalizedId}/sections/${sectionKey}/reflection`,
      payload
    );
  }
}
