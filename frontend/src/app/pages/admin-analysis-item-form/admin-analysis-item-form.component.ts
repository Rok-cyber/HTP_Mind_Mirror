import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of, startWith, switchMap, tap } from 'rxjs';

import {
  AdminAnalysisItemGroupOption,
  AdminAnalysisItemPayload,
  AdminAnalysisItemRuleRow,
  AdminManagedAnalysisItem,
  AdminService
} from '../../admin/services/admin.service';
import { editableSketchbookTypeStringOptions, SketchbookTypeOption } from '../../sketchbook/utils/sketchbook-display.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; groups: AdminAnalysisItemGroupOption[]; item: AdminManagedAnalysisItem | null };

@Component({
  selector: 'app-admin-analysis-item-form',
  standalone: true,
  imports: [AsyncPipe, FormsModule, RouterLink],
  templateUrl: './admin-analysis-item-form.component.html'
})
export class AdminAnalysisItemFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly adminService = inject(AdminService);

  protected readonly typeOptions: readonly SketchbookTypeOption<string>[] = editableSketchbookTypeStringOptions;
  protected form = this.emptyForm();
  protected selectedTypes = new Set<string>();
  protected errorMessage = '';
  protected saving = false;
  protected siNo = '';

  protected readonly state$ = this.route.paramMap.pipe(
    tap((params) => {
      this.siNo = params.get('siNo') ?? '';
      this.errorMessage = '';
      this.saving = false;
    }),
    switchMap((params) => {
      const siNo = params.get('siNo');
      const groups$ = this.adminService.getAnalysisItemGroups();
      const item$ = siNo ? this.adminService.getManagedAnalysisItem(siNo) : of(null);

      return forkJoin({ groups: groups$, item: item$ }).pipe(
        tap(({ groups, item }) => this.initializeForm(groups, item)),
        map(({ groups, item }): PageState => ({ status: 'loaded', groups, item })),
        startWith({ status: 'loading' } as PageState),
        catchError(() => of({ status: 'error', message: '분석항목 정보를 불러올 수 없습니다.' } satisfies PageState))
      );
    })
  );

  protected get isEdit(): boolean {
    return this.siNo !== '';
  }

  protected toggleType(value: string, checked: boolean): void {
    if (checked) {
      this.selectedTypes.add(value);
    } else {
      this.selectedTypes.delete(value);
    }
  }

  protected isTypeSelected(value: string): boolean {
    return this.selectedTypes.has(value);
  }

  protected onTypeOptionChange(value: string, event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.toggleType(value, target.checked);
    }
  }

  protected addRow(): void {
    this.form.rows.push(this.emptyRow());
  }

  protected removeRow(index: number): void {
    if (this.form.rows.length <= 1) {
      this.errorMessage = '규칙 행은 하나 이상 필요합니다.';
      return;
    }

    this.form.rows.splice(index, 1);
  }

  protected save(): void {
    if (this.saving) {
      return;
    }

    const payload = this.buildPayload();

    if (!payload.sg_no || !payload.si_name.trim() || payload.rows.length === 0) {
      this.errorMessage = '그룹, 항목명, 규칙 행을 확인해 주세요.';
      return;
    }

    this.errorMessage = '';
    this.saving = true;
    const request$ = this.isEdit ? this.adminService.updateAnalysisItem(this.siNo, payload) : this.adminService.createAnalysisItem(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/admin/analysis-items']),
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.errorMessage = error.error?.message || error.error?.error || '분석항목을 저장할 수 없습니다.';
      }
    });
  }

  private initializeForm(groups: AdminAnalysisItemGroupOption[], item: AdminManagedAnalysisItem | null): void {
    if (item) {
      this.form = {
        sg_no: item.sg_no,
        si_sort: item.si_sort,
        si_name: item.si_name,
        si_status: item.si_status,
        rows: item.rows.length > 0 ? item.rows.map((row) => ({ ...row })) : [this.emptyRow()]
      };
      this.selectedTypes = new Set(item.si_type.split('|^').filter(Boolean));
      return;
    }

    this.form = this.emptyForm(groups[0]?.sg_no ?? 0);
    this.selectedTypes = new Set(['1', '2', '3', '4', '6']);
  }

  private buildPayload(): AdminAnalysisItemPayload {
    return {
      sg_no: Number(this.form.sg_no),
      si_sort: Number(this.form.si_sort) || 0,
      si_name: this.form.si_name,
      si_status: Number(this.form.si_status) === 0 ? 0 : 1,
      si_type: [...this.selectedTypes],
      rows: this.form.rows.map((row) => ({ ...row }))
    };
  }

  private emptyForm(sgNo = 0): { sg_no: number; si_sort: number; si_name: string; si_status: number; rows: AdminAnalysisItemRuleRow[] } {
    return {
      sg_no: sgNo,
      si_sort: 0,
      si_name: '',
      si_status: 1,
      rows: [this.emptyRow()]
    };
  }

  private emptyRow(): AdminAnalysisItemRuleRow {
    return {
      status: '',
      detail: '',
      emotion: '',
      adaptation: '',
      relationship: '',
      tendency: '',
      adultInterpretation: '',
      childInterpretation: '',
      seniorInterpretation: '',
      adultFeedback: '',
      childFeedback: '',
      seniorFeedback: ''
    };
  }
}
