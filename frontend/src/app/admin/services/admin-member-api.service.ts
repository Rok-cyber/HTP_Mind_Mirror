import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import type { AdminMember, AdminSketchbook } from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminMemberApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getMembers(): Observable<{ members: AdminMember[] }> {
    return this.http.get<{ members: AdminMember[] }>(`${this.apiBaseUrl}/admin/members`);
  }

  getMemberSketchbooks(mbNo: string): Observable<{ sketchbooks: AdminSketchbook[] }> {
    return this.http.get<{ sketchbooks: AdminSketchbook[] }>(
      `${this.apiBaseUrl}/admin/members/${encodeURIComponent(mbNo)}/sketchbooks`
    );
  }
}
