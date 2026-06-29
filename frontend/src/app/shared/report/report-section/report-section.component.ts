import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RadarChartComponent } from '../../charts/radar-chart/radar-chart.component';
import { ReportCategory } from '../../../reports/models/report.model';
import { InterpretationCardComponent } from '../interpretation-card/interpretation-card.component';
import { LegacyHtmlPipe } from '../legacy-html.pipe';
import { ScoreCardComponent } from '../score-card/score-card.component';
import { SummaryBoxComponent } from '../summary-box/summary-box.component';

@Component({
  selector: 'app-report-section',
  standalone: true,
  imports: [InterpretationCardComponent, LegacyHtmlPipe, RadarChartComponent, RouterLink, ScoreCardComponent, SummaryBoxComponent],
  templateUrl: './report-section.component.html'
})
export class ReportSectionComponent {
  @Input({ required: true }) category!: ReportCategory;
  @Input() reportId = '';
  @Input() chartDescription = 'Score Visualization';
}
