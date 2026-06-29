import { Component } from '@angular/core';

import { sampleReport } from '../../reports/mocks/sample-report.mock';
import { ReportHeaderComponent } from '../../shared/layout/report-header/report-header.component';
import { ImageViewerComponent } from '../../shared/report/image-viewer/image-viewer.component';
import { ReportSectionComponent } from '../../shared/report/report-section/report-section.component';

@Component({
  selector: 'app-sample-report',
  standalone: true,
  imports: [ImageViewerComponent, ReportHeaderComponent, ReportSectionComponent],
  templateUrl: './sample-report.component.html'
})
export class SampleReportComponent {
  protected readonly report = sampleReport;
}
