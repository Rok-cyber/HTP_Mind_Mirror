import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';

import { PremiumReportRendererComponent } from '../../premium-report/components/premium-report-renderer/premium-report-renderer.component';
import { PremiumNarrativeReport } from '../../premium-report/models/premium-narrative-report.model';
import { PremiumReportDataService } from '../../premium-report/services/premium-report-data.service';

type PremiumReportMockState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; report: PremiumNarrativeReport };

@Component({
  selector: 'app-premium-report-mock',
  standalone: true,
  imports: [AsyncPipe, PremiumReportRendererComponent],
  templateUrl: './premium-report-mock.component.html',
  styleUrl: './premium-report-mock.component.css'
})
export class PremiumReportMockComponent {
  private readonly reportData = inject(PremiumReportDataService);

  protected readonly state$: Observable<PremiumReportMockState> = this.reportData.getMockPremiumReport().pipe(
    map((report): PremiumReportMockState => ({ status: 'loaded', report })),
    startWith({ status: 'loading' } as PremiumReportMockState),
    catchError(() =>
      of({
        status: 'error',
        message: 'Unable to load the premium report mock JSON.'
      } satisfies PremiumReportMockState)
    )
  );
}
