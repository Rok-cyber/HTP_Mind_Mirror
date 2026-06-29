import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AdminMergeCandidateGroup, AdminMergeCandidateItem, AdminService } from '../../admin/services/admin.service';
import { adminSketchbookAnalysisRoute } from '../../admin/utils/admin-navigation.util';
import { getSketchbookTypeLabel } from '../../sketchbook/utils/sketchbook-display.util';

@Component({
  selector: 'app-admin-merge-candidates',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-merge-candidates.component.html'
})
export class AdminMergeCandidatesComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);

  protected loading = true;
  protected submitting = false;
  protected errorMessage = '';
  protected notice = '';
  protected groups: AdminMergeCandidateGroup[] = [];
  protected selectedGroup: AdminMergeCandidateGroup | null = null;
  protected targetSbNo = 0;
  protected readonly sourceSbNos = new Set<number>();
  protected lastMergedTarget: number | null = null;
  protected lastMergedTargetType: number | null = null;

  ngOnInit(): void {
    this.loadCandidates();
  }

  protected selectGroup(group: AdminMergeCandidateGroup): void {
    this.selectedGroup = group;
    this.targetSbNo = group.items[0]?.sbNo ?? 0;
    this.sourceSbNos.clear();

    for (const item of group.items) {
      if (item.sbNo !== this.targetSbNo) {
        this.sourceSbNos.add(item.sbNo);
      }
    }

    this.errorMessage = '';
  }

  protected setTarget(item: AdminMergeCandidateItem): void {
    this.targetSbNo = item.sbNo;
    this.sourceSbNos.delete(item.sbNo);

    if (this.selectedGroup) {
      for (const candidate of this.selectedGroup.items) {
        if (candidate.sbNo !== item.sbNo && !this.sourceSbNos.has(candidate.sbNo)) {
          this.sourceSbNos.add(candidate.sbNo);
        }
      }
    }
  }

  protected toggleSource(item: AdminMergeCandidateItem, event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement) || item.sbNo === this.targetSbNo) {
      return;
    }

    if (target.checked) {
      this.sourceSbNos.add(item.sbNo);
    } else {
      this.sourceSbNos.delete(item.sbNo);
    }
  }

  protected isSourceSelected(item: AdminMergeCandidateItem): boolean {
    return this.sourceSbNos.has(item.sbNo);
  }

  protected mergeSelected(): void {
    if (!this.selectedGroup || this.submitting) {
      return;
    }

    const sourceSbNos = [...this.sourceSbNos].filter((sbNo) => sbNo !== this.targetSbNo);

    if (!this.targetSbNo || sourceSbNos.length === 0) {
      this.errorMessage = '타깃과 병합할 source 스케치북을 선택해 주세요.';
      return;
    }

    const confirmed = window.confirm(
      `선택한 ${sourceSbNos.length}개 스케치북의 이미지를 #${this.targetSbNo}로 옮기고 source 스케치북을 삭제 처리합니다.\n\n타깃의 기존 분석 결과는 무효화되며 재분석이 필요합니다.`
    );

    if (!confirmed) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.adminService.mergeSketchbooks(this.targetSbNo, sourceSbNos).subscribe({
      next: (result) => {
        this.lastMergedTarget = result.targetSbNo;
        this.lastMergedTargetType = this.selectedGroup?.items.find((item) => item.sbNo === result.targetSbNo)?.slType ?? null;
        this.notice = `#${result.targetSbNo}로 병합했습니다. 이동된 이미지 row: ${result.movedFileCount}개`;
        this.groups = this.groups.filter((group) => group.groupKey !== this.selectedGroup?.groupKey);
        this.selectedGroup = null;
        this.targetSbNo = 0;
        this.sourceSbNos.clear();
        this.submitting = false;

        if (this.groups.length > 0) {
          this.selectGroup(this.groups[0]);
        }
      },
      error: () => {
        this.errorMessage = '병합을 완료할 수 없습니다.';
        this.submitting = false;
      }
    });
  }

  protected goToAnalysis(): void {
    if (this.lastMergedTarget) {
      this.router.navigate(adminSketchbookAnalysisRoute({ sbNo: this.lastMergedTarget, slType: this.lastMergedTargetType }));
    }
  }

  protected typeLabel(type: number): string {
    return getSketchbookTypeLabel(type);
  }

  private loadCandidates(): void {
    this.loading = true;
    this.errorMessage = '';
    this.adminService.getMergeCandidates().subscribe({
      next: (data) => {
        this.groups = data.groups;
        this.loading = false;

        if (this.groups.length > 0) {
          this.selectGroup(this.groups[0]);
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = '병합 후보를 불러올 수 없습니다.';
      }
    });
  }
}
