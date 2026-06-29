import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { AdminService, AdminSketchbook } from '../../admin/services/admin.service';
import {
  adminReportQueryParams,
  adminReportRoute,
  adminSketchbookAnalysisRoute
} from '../../admin/utils/admin-navigation.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; mbNo: string; sketchbooks: AdminSketchbook[] };

type AnalysisFilter = 'all' | 'completed' | 'needed' | 'incomplete';

interface FilterOption {
  value: AnalysisFilter;
  label: string;
}

@Component({
  selector: 'app-admin-sketchbooks',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-sketchbooks.component.html'
})
export class AdminSketchbooksComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly adminService = inject(AdminService);

  protected activeFilter: AnalysisFilter = 'all';
  protected readonly filters: FilterOption[] = [
    { value: 'all', label: '전체' },
    { value: 'completed', label: '분석 완료' },
    { value: 'needed', label: '분석 필요' },
    { value: 'incomplete', label: '미완성' }
  ];
  protected notice = '';

  protected readonly state$ = this.route.paramMap.pipe(
    map((params) => params.get('mbNo') ?? ''),
    switchMap((mbNo) =>
      this.adminService.getMemberSketchbooks(mbNo).pipe(
        map((response): PageState => ({ status: 'loaded', mbNo, sketchbooks: response.sketchbooks })),
        startWith({ status: 'loading' } as PageState),
        catchError(() => of({ status: 'error', message: '스케치북 목록을 불러올 수 없습니다.' } satisfies PageState))
      )
    )
  );

  protected setFilter(filter: AnalysisFilter): void {
    this.activeFilter = filter;
  }

  protected filteredSketchbooks(sketchbooks: AdminSketchbook[]): AdminSketchbook[] {
    if (this.activeFilter === 'all') {
      return sketchbooks.filter((sketchbook) => sketchbook.analysisStatus !== '미완성');
    }

    if (this.activeFilter === 'completed') {
      return sketchbooks.filter((sketchbook) => sketchbook.analysisStatus === '분석 완료');
    }

    if (this.activeFilter === 'needed') {
      return sketchbooks.filter((sketchbook) => sketchbook.analysisStatus === '분석 필요');
    }

    return sketchbooks.filter((sketchbook) => sketchbook.analysisStatus === '미완성');
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
