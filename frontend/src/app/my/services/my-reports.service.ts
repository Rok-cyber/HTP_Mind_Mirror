import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';

export interface MySketchbook {
  sb_no: number;
  sb_name: string;
  sb_age: number | null;
  sb_gender: number | null;
  sl_type: number;
  sb_status: number;
  sf_count: number;
  sb_regdate: string;
  sb_lastupdate: string;
  sb_analysis_step: number;
  hasResult: boolean;
  hasPremiumReport: boolean;
  reportStatus: 'expert_pending' | 'complete';
  reportStatusLabel: string;
  canViewReport: boolean;
  canViewPremiumReport: boolean;
}

@Injectable({ providedIn: 'root' })
export class MyReportsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getSketchbooks(): Observable<{ sketchbooks: MySketchbook[] }> {
    return this.http.get<{ sketchbooks: MySketchbook[] }>(`${this.apiBaseUrl}/my/sketchbooks`);
  }
}
