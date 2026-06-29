import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';

import { AdminAnalysisData, AdminAnalysisImage, AdminService } from '../../admin/services/admin.service';
import { adminReportQueryParams, adminReportRoute } from '../../admin/utils/admin-navigation.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; data: AdminAnalysisData };

@Component({
  selector: 'app-admin-sketchbook-analysis',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-sketchbook-analysis.component.html'
})
export class AdminSketchbookAnalysisComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly adminService = inject(AdminService);

  protected readonly selectedValues = new Map<number, Set<string>>();
  protected readonly imageRotations = new Map<string, number>();
  protected activeImage: AdminAnalysisImage | null = null;
  protected errorMessage = '';
  protected submitting = false;

  protected readonly state$ = this.route.paramMap.pipe(
    map((params) => params.get('sbNo') ?? ''),
    switchMap((sbNo) =>
      this.adminService.getSketchbookAnalysisItems(sbNo).pipe(
        tap((data) => this.initializePage(data)),
        map((data): PageState => ({ status: 'loaded', data })),
        startWith({ status: 'loading' } as PageState),
        catchError(() => of({ status: 'error', message: '분석 항목을 불러올 수 없습니다.' } satisfies PageState))
      )
    )
  );

  protected setActiveImage(image: AdminAnalysisImage): void {
    this.activeImage = image;
  }

  protected imageRotation(image: AdminAnalysisImage | null): number {
    return image ? (this.imageRotations.get(image.url) ?? 0) : 0;
  }

  protected rotateImage(image: AdminAnalysisImage | null, event?: Event): void {
    event?.stopPropagation();

    if (!image) {
      return;
    }

    this.imageRotations.set(image.url, (this.imageRotation(image) + 90) % 360);
  }

  protected resetImageRotation(image: AdminAnalysisImage | null, event?: Event): void {
    event?.stopPropagation();

    if (!image) {
      return;
    }

    this.imageRotations.delete(image.url);
  }

  protected isSelected(siNo: number, rawValue: string): boolean {
    return this.selectedValues.get(siNo)?.has(rawValue) ?? false;
  }

  protected toggleSelection(siNo: number, rawValue: string, event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const values = this.selectedValues.get(siNo) ?? new Set<string>();

    if (target.checked) {
      values.add(rawValue);
    } else {
      values.delete(rawValue);
    }

    if (values.size > 0) {
      this.selectedValues.set(siNo, values);
    } else {
      this.selectedValues.delete(siNo);
    }
  }

  protected submit(data: AdminAnalysisData): void {
    if (data.sketchbook.unsupported || this.submitting) {
      return;
    }

    const selections = this.buildPayload();

    if (Object.keys(selections).length === 0) {
      this.errorMessage = '분석 항목을 하나 이상 선택해 주세요.';
      return;
    }

    this.errorMessage = '';
    this.submitting = true;
    this.adminService.analyzeSketchbook(data.sketchbook.sbNo, selections).subscribe({
      next: () =>
        this.router.navigate(adminReportRoute(data.sketchbook), {
          queryParams: adminReportQueryParams(data.sketchbook)
        }),
      error: (error: HttpErrorResponse) => {
        this.submitting = false;
        this.errorMessage = error.error?.message || error.error?.error || '분석을 완료할 수 없습니다.';
      }
    });
  }

  protected cancel(): void {
    this.router.navigate(['/admin/sketchbooks']);
  }

  private initializePage(data: AdminAnalysisData): void {
    this.selectedValues.clear();
    this.errorMessage = '';
    this.submitting = false;
    this.imageRotations.clear();
    this.activeImage = data.images[0] ?? null;

    for (const group of data.groups) {
      for (const item of group.items) {
        if (item.selectedRawValues.length > 0) {
          this.selectedValues.set(item.siNo, new Set(item.selectedRawValues));
        }
      }
    }
  }

  private buildPayload(): Record<string, string[]> {
    const payload: Record<string, string[]> = {};

    for (const [siNo, values] of this.selectedValues.entries()) {
      if (values.size > 0) {
        payload[String(siNo)] = [...values];
      }
    }

    return payload;
  }
}
