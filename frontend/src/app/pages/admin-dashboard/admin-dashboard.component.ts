import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';

import { AdminDashboardData, AdminDashboardItem, AdminService } from '../../admin/services/admin.service';
import {
  adminReportQueryParams,
  adminReportRoute,
  adminSketchbookAnalysisRoute
} from '../../admin/utils/admin-navigation.util';
import { getSketchbookTypeLabel } from '../../sketchbook/utils/sketchbook-display.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; data: AdminDashboardData };

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);

  protected readonly state$ = this.adminService.getDashboard().pipe(
    map((data): PageState => ({ status: 'loaded', data })),
    startWith({ status: 'loading' } as PageState),
    catchError(() => of({ status: 'error', message: '대시보드 데이터를 불러올 수 없습니다.' } satisfies PageState))
  );

  protected analyze(item: AdminDashboardItem): void {
    this.router.navigate(adminSketchbookAnalysisRoute(item));
  }

  protected openReport(item: AdminDashboardItem): void {
    this.router.navigate(adminReportRoute(item), { queryParams: adminReportQueryParams(item) });
  }

  protected typeLabel(type: number | string): string {
    return getSketchbookTypeLabel(type);
  }

  protected typeCountEntries(typeCounts: Record<string, number>): { type: string; label: string; count: number }[] {
    return Object.keys(typeCounts)
      .sort((a, b) => Number(a) - Number(b))
      .map((type) => ({ type, label: this.typeLabel(type), count: typeCounts[type] ?? 0 }));
  }
}
