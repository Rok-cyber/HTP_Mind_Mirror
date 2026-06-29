import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api-base-url.token';
import type {
  AdminAnalysisData,
  AdminAnalyzeResponse,
  AdminSeniorAnalysisForm,
  AdminSeniorAnalyzeResponse
} from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminSketchbookAnalysisApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getSketchbookAnalysisItems(sbNo: string): Observable<AdminAnalysisData> {
    return this.http.get<AdminAnalysisData>(
      `${this.apiBaseUrl}/admin/sketchbooks/${encodeURIComponent(sbNo)}/analysis-items`
    );
  }

  analyzeSketchbook(sbNo: number, selections: Record<string, string[]>): Observable<AdminAnalyzeResponse> {
    return this.http.post<AdminAnalyzeResponse>(`${this.apiBaseUrl}/admin/sketchbooks/${sbNo}/analyze`, { selections });
  }

  getSeniorAnalysisForm(sbNo: string): Observable<AdminSeniorAnalysisForm> {
    return this.http.get<AdminSeniorAnalysisForm>(
      `${this.apiBaseUrl}/admin/sketchbooks/${encodeURIComponent(sbNo)}/analyze-senior/form`
    );
  }

  analyzeSeniorSketchbook(
    sbNo: number,
    answers: Record<string, number>,
    summary: string
  ): Observable<AdminSeniorAnalyzeResponse> {
    return this.http.post<AdminSeniorAnalyzeResponse>(`${this.apiBaseUrl}/admin/sketchbooks/${sbNo}/analyze-senior`, {
      answers,
      sb_analysis_total: summary
    });
  }
}
