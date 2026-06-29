import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import type {
  AdminAnalysisItemGroupOption,
  AdminAnalysisItemPayload,
  AdminManagedAnalysisItem,
  AdminManagedAnalysisItemGroup
} from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminAnalysisItemApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getManagedAnalysisItems(): Observable<{ groups: AdminManagedAnalysisItemGroup[] }> {
    return this.http.get<{ groups: AdminManagedAnalysisItemGroup[] }>(`${this.apiBaseUrl}/admin/analysis-items/manage`);
  }

  getManagedAnalysisItem(siNo: string): Observable<AdminManagedAnalysisItem> {
    return this.http.get<AdminManagedAnalysisItem>(`${this.apiBaseUrl}/admin/analysis-items/${encodeURIComponent(siNo)}`);
  }

  getAnalysisItemGroups(): Observable<AdminAnalysisItemGroupOption[]> {
    return this.http.get<AdminAnalysisItemGroupOption[]>(`${this.apiBaseUrl}/admin/analysis-item-groups`);
  }

  createAnalysisItem(payload: AdminAnalysisItemPayload): Observable<{ success: true; si_no: number }> {
    return this.http.post<{ success: true; si_no: number }>(`${this.apiBaseUrl}/admin/analysis-items`, payload);
  }

  updateAnalysisItem(siNo: string, payload: AdminAnalysisItemPayload): Observable<{ success: true; si_no: number }> {
    return this.http.patch<{ success: true; si_no: number }>(
      `${this.apiBaseUrl}/admin/analysis-items/${encodeURIComponent(siNo)}`,
      payload
    );
  }

  deleteAnalysisItem(siNo: number): Observable<{ success: true; si_no: number }> {
    return this.http.delete<{ success: true; si_no: number }>(`${this.apiBaseUrl}/admin/analysis-items/${siNo}`);
  }
}
