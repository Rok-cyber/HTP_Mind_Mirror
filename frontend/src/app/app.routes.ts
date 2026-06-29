import { Routes } from '@angular/router';

import { adminGuard, authGuard } from './auth/auth.guard';
import { AdminAnalysisItemFormComponent } from './pages/admin-analysis-item-form/admin-analysis-item-form.component';
import { AdminAnalysisItemsComponent } from './pages/admin-analysis-items/admin-analysis-items.component';
import { AdminAllSketchbooksComponent } from './pages/admin-all-sketchbooks/admin-all-sketchbooks.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminMergeCandidatesComponent } from './pages/admin-merge-candidates/admin-merge-candidates.component';
import { AdminMembersComponent } from './pages/admin-members/admin-members.component';
import { AdminPremiumPayloadComponent } from './pages/admin-premium-payload/admin-premium-payload.component';
import { AdminPremiumReportHistoryComponent } from './pages/admin-premium-report-history/admin-premium-report-history.component';
import { AdminSeniorAnalysisComponent } from './pages/admin-senior-analysis/admin-senior-analysis.component';
import { AdminSketchbookAnalysisComponent } from './pages/admin-sketchbook-analysis/admin-sketchbook-analysis.component';
import { AdminSketchbookProfileComponent } from './pages/admin-sketchbook-profile/admin-sketchbook-profile.component';
import { AdminSketchbooksComponent } from './pages/admin-sketchbooks/admin-sketchbooks.component';
import { AdminUntypedSketchbooksComponent } from './pages/admin-untyped-sketchbooks/admin-untyped-sketchbooks.component';
import { LoginComponent } from './pages/login/login.component';
import { MyReportsComponent } from './pages/my-reports/my-reports.component';
import { PremiumReportComponent } from './pages/premium-report/premium-report.component';
import { PremiumReportPrintComponent } from './pages/premium-report-print/premium-report-print.component';
import { PremiumReportMockComponent } from './pages/premium-report-mock/premium-report-mock.component';
import { ReportComponent } from './pages/report/report.component';
import { ReportPrintComponent } from './pages/report-print/report-print.component';
import { ReportSectionDetailComponent } from './pages/report-section-detail/report-section-detail.component';
import { SampleReportComponent } from './pages/sample-report/sample-report.component';
import { SketchbookUploadComponent } from './pages/sketchbook-upload/sketchbook-upload.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard' },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/analysis-items', component: AdminAnalysisItemsComponent, canActivate: [adminGuard] },
  { path: 'admin/analysis-items/new', component: AdminAnalysisItemFormComponent, canActivate: [adminGuard] },
  { path: 'admin/analysis-items/:siNo/edit', component: AdminAnalysisItemFormComponent, canActivate: [adminGuard] },
  { path: 'admin/search', component: AdminMembersComponent, canActivate: [adminGuard] },
  { path: 'admin/members', component: AdminMembersComponent, canActivate: [adminGuard] },
  { path: 'admin/sketchbooks', component: AdminAllSketchbooksComponent, canActivate: [adminGuard] },
  { path: 'admin/premium-reports/:sbNo/history', component: AdminPremiumReportHistoryComponent, canActivate: [adminGuard] },
  { path: 'admin/premium-preview/:sbNo/history', component: AdminPremiumReportHistoryComponent, canActivate: [adminGuard] },
  { path: 'admin/premium-preview/:sbNo', component: AdminPremiumPayloadComponent, canActivate: [adminGuard] },
  { path: 'admin/reports/:sbNo/premium-payload', component: AdminPremiumPayloadComponent, canActivate: [adminGuard] },
  { path: 'admin/sketchbooks/untyped', component: AdminUntypedSketchbooksComponent, canActivate: [adminGuard] },
  { path: 'admin/sketchbooks/merge-candidates', component: AdminMergeCandidatesComponent, canActivate: [adminGuard] },
  { path: 'admin/sketchbooks/:sbNo/profile', component: AdminSketchbookProfileComponent, canActivate: [adminGuard] },
  { path: 'admin/sketchbooks/:sbNo/analyze-senior', component: AdminSeniorAnalysisComponent, canActivate: [adminGuard] },
  { path: 'admin/sketchbooks/:sbNo/analyze', component: AdminSketchbookAnalysisComponent, canActivate: [adminGuard] },
  { path: 'admin/members/:mbNo/sketchbooks', component: AdminSketchbooksComponent, canActivate: [adminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my/reports', component: MyReportsComponent, canActivate: [authGuard] },
  { path: 'my/reports/:sbNo/premium/print', component: PremiumReportPrintComponent, canActivate: [authGuard] },
  { path: 'my/reports/:sbNo/premium', component: PremiumReportComponent, canActivate: [authGuard] },
  { path: 'premium-report/mock', component: PremiumReportMockComponent },
  { path: 'premium-report/:sbNo/versions/:prNo/print', component: PremiumReportPrintComponent, canActivate: [authGuard] },
  { path: 'premium-report/:sbNo/versions/:prNo', component: PremiumReportComponent, canActivate: [authGuard] },
  { path: 'premium-report/:sbNo/print', component: PremiumReportPrintComponent, canActivate: [authGuard] },
  { path: 'premium-report/:sbNo', component: PremiumReportComponent, canActivate: [authGuard] },
  { path: 'sample-report', component: SampleReportComponent },
  { path: 'sketchbook/upload', component: SketchbookUploadComponent, canActivate: [authGuard] },
  { path: 'report/:sbId/sections/:sectionKey', component: ReportSectionDetailComponent, canActivate: [authGuard] },
  { path: 'report/:sbId/print', component: ReportPrintComponent, canActivate: [authGuard] },
  { path: 'report/:sbId', component: ReportComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'sample-report' }
];
