import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import type { AdminPremiumPayload } from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminPremiumReportApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getPremiumPayload(sbNo: string): Observable<AdminPremiumPayload> {
    return this.http.get<AdminPremiumPayload>(`${this.apiBaseUrl}/admin/reports/${encodeURIComponent(sbNo)}/premium-payload`);
  }
}
