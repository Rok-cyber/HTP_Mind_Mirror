import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';

import { MyReportsService, MySketchbook } from '../../my/services/my-reports.service';
import { getSketchbookTypeLabel } from '../../sketchbook/utils/sketchbook-display.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; sketchbooks: MySketchbook[] };

@Component({
  selector: 'app-my-reports',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './my-reports.component.html'
})
export class MyReportsComponent {
  private readonly myReports = inject(MyReportsService);

  protected readonly state$ = this.myReports.getSketchbooks().pipe(
    map((response): PageState => ({ status: 'loaded', sketchbooks: response.sketchbooks })),
    startWith({ status: 'loading' } as PageState),
    catchError(() => of({ status: 'error', message: '내 리포트 목록을 불러올 수 없습니다.' } satisfies PageState))
  );

  protected typeLabel(type: number): string {
    return getSketchbookTypeLabel(type);
  }

  protected statusLabel(sketchbook: MySketchbook): string {
    return sketchbook.reportStatusLabel || (sketchbook.reportStatus === 'complete' ? '리포트 결과가 나왔습니다' : '심리분석 전문가가 최종 분석 중입니다');
  }

  protected completedCount(sketchbooks: MySketchbook[]): number {
    return sketchbooks.filter((sketchbook) => sketchbook.canViewReport).length;
  }

  protected premiumCount(sketchbooks: MySketchbook[]): number {
    return sketchbooks.filter((sketchbook) => sketchbook.canViewPremiumReport).length;
  }

  protected pendingCount(sketchbooks: MySketchbook[]): number {
    return sketchbooks.filter((sketchbook) => !sketchbook.canViewReport).length;
  }
}
