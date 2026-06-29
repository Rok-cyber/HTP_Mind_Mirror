import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';

import { AdminService, AdminSketchbook } from '../../admin/services/admin.service';
import {
  adminReportQueryParams,
  adminReportRoute,
  adminSketchbookAnalysisRoute
} from '../../admin/utils/admin-navigation.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; sketchbooks: AdminSketchbook[] };

type AnalysisFilter = 'all' | 'needed' | 'completed';

interface FilterOption {
  value: AnalysisFilter;
  label: string;
}

@Component({
  selector: 'app-admin-all-sketchbooks',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-all-sketchbooks.component.html'
})
export class AdminAllSketchbooksComponent {
  private readonly router = inject(Router);
  private readonly adminService = inject(AdminService);

  protected activeFilter: AnalysisFilter = 'all';
  protected readonly filters: FilterOption[] = [
    { value: 'all', label: '전체' },
    { value: 'needed', label: '분석 필요' },
    { value: 'completed', label: '분석 완료' }
  ];
  protected notice = '';

  protected readonly state$ = this.adminService.getSketchbooks().pipe(
    map((response): PageState => ({ status: 'loaded', sketchbooks: response.sketchbooks })),
    startWith({ status: 'loading' } as PageState),
    catchError(() => of({ status: 'error', message: '스케치북 목록을 불러올 수 없습니다.' } satisfies PageState))
  );

  protected setFilter(filter: AnalysisFilter): void {
    this.activeFilter = filter;
  }

  protected filteredSketchbooks(sketchbooks: AdminSketchbook[]): AdminSketchbook[] {
    if (this.activeFilter === 'needed') {
      return sketchbooks.filter((sketchbook) => sketchbook.analysisStatus === '분석 필요');
    }

    if (this.activeFilter === 'completed') {
      return sketchbooks.filter((sketchbook) => sketchbook.analysisStatus === '분석 완료');
    }

    return sketchbooks;
  }

  protected shouldShowAnalyze(sketchbook: AdminSketchbook): boolean {
    return sketchbook.analysisStatus === '분석 필요';
  }

  protected openReport(sketchbook: AdminSketchbook): void {
    this.router.navigate(adminReportRoute(sketchbook), { queryParams: adminReportQueryParams(sketchbook) });
  }

  protected analyze(sketchbook: AdminSketchbook): void {
    this.router.navigate(adminSketchbookAnalysisRoute(sketchbook));
  }
}
