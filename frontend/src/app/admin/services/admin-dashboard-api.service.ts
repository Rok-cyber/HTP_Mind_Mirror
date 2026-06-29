import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import type { AdminDashboardData } from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminDashboardApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getDashboard(): Observable<AdminDashboardData> {
    return this.http.get<AdminDashboardData>(`${this.apiBaseUrl}/admin/dashboard`);
  }
}
