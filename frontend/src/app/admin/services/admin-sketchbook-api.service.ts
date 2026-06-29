import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import type {
  AdminMergeCandidatesData,
  AdminMergeResponse,
  AdminSketchbook,
  AdminSketchbookProfileResponse,
  AdminSketchbookProfileUpdateResponse,
  AdminUntypedSketchbooksData
} from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminSketchbookApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getSketchbooks(): Observable<{ sketchbooks: AdminSketchbook[] }> {
    return this.http.get<{ sketchbooks: AdminSketchbook[] }>(`${this.apiBaseUrl}/admin/sketchbooks`);
  }

  getSketchbookProfile(sbNo: string): Observable<AdminSketchbookProfileResponse> {
    return this.http.get<AdminSketchbookProfileResponse>(
      `${this.apiBaseUrl}/admin/sketchbooks/${encodeURIComponent(sbNo)}/profile`
    );
  }

  updateSketchbookProfile(
    sbNo: string,
    profile: { mbti_self: string | null; mbti_others: string | null }
  ): Observable<AdminSketchbookProfileUpdateResponse> {
    return this.http.patch<AdminSketchbookProfileUpdateResponse>(
      `${this.apiBaseUrl}/admin/sketchbooks/${encodeURIComponent(sbNo)}/profile`,
      profile
    );
  }

  getUntypedSketchbooks(page = 1, limit = 20): Observable<AdminUntypedSketchbooksData> {
    return this.http.get<AdminUntypedSketchbooksData>(`${this.apiBaseUrl}/admin/sketchbooks/untyped`, {
      params: {
        page,
        limit
      }
    });
  }

  updateSketchbookType(sbNo: number, slType: number): Observable<{ success: true; sbNo: number; slType: number }> {
    return this.http.patch<{ success: true; sbNo: number; slType: number }>(
      `${this.apiBaseUrl}/admin/sketchbooks/${sbNo}/type`,
      { sl_type: slType }
    );
  }

  softDeleteSketchbook(sbNo: number): Observable<{ success: true; sbNo: number }> {
    return this.http.patch<{ success: true; sbNo: number }>(`${this.apiBaseUrl}/admin/sketchbooks/${sbNo}/delete`, {});
  }

  getMergeCandidates(): Observable<AdminMergeCandidatesData> {
    return this.http.get<AdminMergeCandidatesData>(`${this.apiBaseUrl}/admin/sketchbooks/merge-candidates`);
  }

  mergeSketchbooks(targetSbNo: number, sourceSbNos: number[]): Observable<AdminMergeResponse> {
    return this.http.post<AdminMergeResponse>(`${this.apiBaseUrl}/admin/sketchbooks/merge`, {
      targetSbNo,
      sourceSbNos
    });
  }
}
