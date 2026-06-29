import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';

import { AdminManagedAnalysisItem, AdminService } from '../../admin/services/admin.service';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; groups: { sg_no: number; sg_title: string; items: AdminManagedAnalysisItem[] }[] };

@Component({
  selector: 'app-admin-analysis-items',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-analysis-items.component.html'
})
export class AdminAnalysisItemsComponent {
  private readonly adminService = inject(AdminService);
  private readonly reload$ = new BehaviorSubject<void>(undefined);

  protected notice = '';

  protected readonly state$ = this.reload$.pipe(
    switchMap(() =>
      this.adminService.getManagedAnalysisItems().pipe(
        map((response): PageState => ({ status: 'loaded', groups: response.groups })),
        startWith({ status: 'loading' } as PageState),
        catchError(() => of({ status: 'error', message: '분석항목을 불러올 수 없습니다.' } satisfies PageState))
      )
    )
  );

  protected deleteItem(item: AdminManagedAnalysisItem): void {
    if (!confirm(`"${item.si_name}" 항목을 삭제하시겠습니까?`)) {
      return;
    }

    this.adminService.deleteAnalysisItem(item.si_no).subscribe({
      next: () => {
        this.notice = '분석항목을 삭제했습니다.';
        this.reload$.next();
      },
      error: () => {
        this.notice = '분석항목을 삭제할 수 없습니다.';
      }
    });
  }
}

