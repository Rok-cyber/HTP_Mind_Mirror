import { Component, Input } from '@angular/core';

import { ReportMetric } from '../../../reports/models/report.model';

@Component({
  selector: 'app-score-card',
  standalone: true,
  templateUrl: './score-card.component.html'
})
export class ScoreCardComponent {
  @Input({ required: true }) metric!: ReportMetric;
  @Input({ required: true }) color = '#49675F';
}
