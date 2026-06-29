import { Component, Input } from '@angular/core';

import { ReportDetailCard } from '../../../reports/models/report.model';
import { LegacyHtmlPipe } from '../legacy-html.pipe';

@Component({
  selector: 'app-interpretation-card',
  standalone: true,
  imports: [LegacyHtmlPipe],
  templateUrl: './interpretation-card.component.html'
})
export class InterpretationCardComponent {
  @Input({ required: true }) card!: ReportDetailCard;
}
