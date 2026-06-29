import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type {
  AdminAnalysisData,
  AdminAnalysisItemGroupOption,
  AdminAnalysisItemPayload,
  AdminAnalyzeResponse,
  AdminDashboardData,
  AdminManagedAnalysisItem,
  AdminManagedAnalysisItemGroup,
  AdminMember,
  AdminMergeCandidatesData,
  AdminMergeResponse,
  AdminPremiumPayload,
  AdminSeniorAnalysisForm,
  AdminSeniorAnalyzeResponse,
  AdminSketchbook,
  AdminSketchbookProfileResponse,
  AdminSketchbookProfileUpdateResponse,
  AdminUntypedSketchbooksData
} from '../models/admin-api.model';
import { AdminAnalysisItemApiService } from './admin-analysis-item-api.service';
import { AdminDashboardApiService } from './admin-dashboard-api.service';
import { AdminMemberApiService } from './admin-member-api.service';
import { AdminPremiumReportApiService } from './admin-premium-report-api.service';
import { AdminSketchbookAnalysisApiService } from './admin-sketchbook-analysis-api.service';
import { AdminSketchbookApiService } from './admin-sketchbook-api.service';

export type * from '../models/admin-api.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly dashboardApi = inject(AdminDashboardApiService);
  private readonly memberApi = inject(AdminMemberApiService);
  private readonly sketchbookApi = inject(AdminSketchbookApiService);
  private readonly sketchbookAnalysisApi = inject(AdminSketchbookAnalysisApiService);
  private readonly analysisItemApi = inject(AdminAnalysisItemApiService);
  private readonly premiumReportApi = inject(AdminPremiumReportApiService);

  getMembers(): Observable<{ members: AdminMember[] }> {
    return this.memberApi.getMembers();
  }

  getDashboard(): Observable<AdminDashboardData> {
    return this.dashboardApi.getDashboard();
  }

  getMemberSketchbooks(mbNo: string): Observable<{ sketchbooks: AdminSketchbook[] }> {
    return this.memberApi.getMemberSketchbooks(mbNo);
  }

  getSketchbooks(): Observable<{ sketchbooks: AdminSketchbook[] }> {
    return this.sketchbookApi.getSketchbooks();
  }

  getSketchbookAnalysisItems(sbNo: string): Observable<AdminAnalysisData> {
    return this.sketchbookAnalysisApi.getSketchbookAnalysisItems(sbNo);
  }

  getSketchbookProfile(sbNo: string): Observable<AdminSketchbookProfileResponse> {
    return this.sketchbookApi.getSketchbookProfile(sbNo);
  }

  updateSketchbookProfile(
    sbNo: string,
    profile: { mbti_self: string | null; mbti_others: string | null }
  ): Observable<AdminSketchbookProfileUpdateResponse> {
    return this.sketchbookApi.updateSketchbookProfile(sbNo, profile);
  }

  getPremiumPayload(sbNo: string): Observable<AdminPremiumPayload> {
    return this.premiumReportApi.getPremiumPayload(sbNo);
  }

  getUntypedSketchbooks(page = 1, limit = 20): Observable<AdminUntypedSketchbooksData> {
    return this.sketchbookApi.getUntypedSketchbooks(page, limit);
  }

  updateSketchbookType(sbNo: number, slType: number): Observable<{ success: true; sbNo: number; slType: number }> {
    return this.sketchbookApi.updateSketchbookType(sbNo, slType);
  }

  softDeleteSketchbook(sbNo: number): Observable<{ success: true; sbNo: number }> {
    return this.sketchbookApi.softDeleteSketchbook(sbNo);
  }

  getMergeCandidates(): Observable<AdminMergeCandidatesData> {
    return this.sketchbookApi.getMergeCandidates();
  }

  mergeSketchbooks(targetSbNo: number, sourceSbNos: number[]): Observable<AdminMergeResponse> {
    return this.sketchbookApi.mergeSketchbooks(targetSbNo, sourceSbNos);
  }

  analyzeSketchbook(sbNo: number, selections: Record<string, string[]>): Observable<AdminAnalyzeResponse> {
    return this.sketchbookAnalysisApi.analyzeSketchbook(sbNo, selections);
  }

  getSeniorAnalysisForm(sbNo: string): Observable<AdminSeniorAnalysisForm> {
    return this.sketchbookAnalysisApi.getSeniorAnalysisForm(sbNo);
  }

  analyzeSeniorSketchbook(sbNo: number, answers: Record<string, number>, summary: string): Observable<AdminSeniorAnalyzeResponse> {
    return this.sketchbookAnalysisApi.analyzeSeniorSketchbook(sbNo, answers, summary);
  }

  getManagedAnalysisItems(): Observable<{ groups: AdminManagedAnalysisItemGroup[] }> {
    return this.analysisItemApi.getManagedAnalysisItems();
  }

  getManagedAnalysisItem(siNo: string): Observable<AdminManagedAnalysisItem> {
    return this.analysisItemApi.getManagedAnalysisItem(siNo);
  }

  getAnalysisItemGroups(): Observable<AdminAnalysisItemGroupOption[]> {
    return this.analysisItemApi.getAnalysisItemGroups();
  }

  createAnalysisItem(payload: AdminAnalysisItemPayload): Observable<{ success: true; si_no: number }> {
    return this.analysisItemApi.createAnalysisItem(payload);
  }

  updateAnalysisItem(siNo: string, payload: AdminAnalysisItemPayload): Observable<{ success: true; si_no: number }> {
    return this.analysisItemApi.updateAnalysisItem(siNo, payload);
  }

  deleteAnalysisItem(siNo: number): Observable<{ success: true; si_no: number }> {
    return this.analysisItemApi.deleteAnalysisItem(siNo);
  }
}
