import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AdminAnalysisImage, AdminService, AdminUntypedSketchbook } from '../../admin/services/admin.service';
import { adminSketchbookAnalysisRoute } from '../../admin/utils/admin-navigation.util';
import { editableSketchbookTypeOptions } from '../../sketchbook/utils/sketchbook-display.util';

@Component({
  selector: 'app-admin-untyped-sketchbooks',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-untyped-sketchbooks.component.html'
})
export class AdminUntypedSketchbooksComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);
  private readonly pageSize = 20;

  protected readonly typeOptions = editableSketchbookTypeOptions;

  protected loading = true;
  protected submitting = false;
  protected errorMessage = '';
  protected notice = '';
  protected sketchbooks: AdminUntypedSketchbook[] = [];
  protected selected: AdminUntypedSketchbook | null = null;
  protected activeImage: AdminAnalysisImage | null = null;
  protected selectedType = 0;
  protected lastUpdated: { sbNo: number; slType: number; name: string } | null = null;
  protected currentPage = 1;
  protected totalItems = 0;
  protected totalPages = 1;

  ngOnInit(): void {
    this.loadSketchbooks();
  }

  protected selectSketchbook(sketchbook: AdminUntypedSketchbook): void {
    this.selected = sketchbook;
    this.activeImage = sketchbook.images[0] ?? null;
    this.selectedType = sketchbook.slType || 0;
    this.errorMessage = '';
  }

  protected setActiveImage(image: AdminAnalysisImage): void {
    this.activeImage = image;
  }

  protected saveType(goToAnalysisAfterSave = false): void {
    if (!this.selected || this.submitting) {
      return;
    }

    if (!this.typeOptions.some((option) => option.value === Number(this.selectedType))) {
      this.errorMessage = '검사 유형을 선택해 주세요.';
      return;
    }

    const target = this.selected;
    const nextType = Number(this.selectedType);

    this.submitting = true;
    this.errorMessage = '';
    this.adminService.updateSketchbookType(target.sbNo, nextType).subscribe({
      next: () => {
        this.lastUpdated = { sbNo: target.sbNo, slType: nextType, name: target.sbName };
        this.notice = `${target.sbName}의 검사 유형을 저장했습니다.`;
        if (goToAnalysisAfterSave) {
          this.router.navigate(adminSketchbookAnalysisRoute({ sbNo: target.sbNo, slType: nextType }));
          return;
        }

        this.removeSketchbook(target.sbNo);
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = '검사 유형을 저장할 수 없습니다.';
        this.submitting = false;
      }
    });
  }

  protected deleteSelected(): void {
    if (!this.selected || this.submitting) {
      return;
    }

    const target = this.selected;
    const confirmed = window.confirm(`${target.sbName} 스케치북을 삭제 처리할까요?`);

    if (!confirmed) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.adminService.softDeleteSketchbook(target.sbNo).subscribe({
      next: () => {
        this.notice = `${target.sbName}을 삭제 처리했습니다.`;
        this.removeSketchbook(target.sbNo);
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = '스케치북을 삭제 처리할 수 없습니다.';
        this.submitting = false;
      }
    });
  }

  protected goToAnalysis(target = this.lastUpdated): void {
    if (!target) {
      return;
    }

    this.router.navigate(adminSketchbookAnalysisRoute(target));
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage || this.loading) {
      return;
    }

    this.loadSketchbooks(page);
  }

  private loadSketchbooks(page = this.currentPage): void {
    this.loading = true;
    this.errorMessage = '';
    this.adminService.getUntypedSketchbooks(page, this.pageSize).subscribe({
      next: (data) => {
        this.sketchbooks = data.sketchbooks;
        this.currentPage = data.pagination.page;
        this.totalItems = data.pagination.total;
        this.totalPages = data.pagination.totalPages;
        this.loading = false;
        this.selected = null;
        this.activeImage = null;
        this.selectedType = 0;

        if (this.sketchbooks.length > 0) {
          this.selectSketchbook(this.sketchbooks[0]);
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = '유형 미지정 데이터를 불러올 수 없습니다.';
      }
    });
  }

  private removeSketchbook(sbNo: number): void {
    this.sketchbooks = this.sketchbooks.filter((sketchbook) => sketchbook.sbNo !== sbNo);
    this.totalItems = Math.max(0, this.totalItems - 1);
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));

    if (this.sketchbooks.length === 0 && this.totalItems > 0) {
      this.loadSketchbooks(Math.min(this.currentPage, this.totalPages));
      return;
    }

    if (this.selected?.sbNo === sbNo) {
      this.selected = null;
      this.activeImage = null;
      this.selectedType = 0;

      if (this.sketchbooks.length > 0) {
        this.selectSketchbook(this.sketchbooks[0]);
      }
    }
  }
}
