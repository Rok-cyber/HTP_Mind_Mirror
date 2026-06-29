import { Component, Input } from '@angular/core';

import { LegacyHtmlPipe } from '../legacy-html.pipe';

@Component({
  selector: 'app-detail-section',
  standalone: true,
  imports: [LegacyHtmlPipe],
  templateUrl: './detail-section.component.html'
})
export class DetailSectionComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) detail = '';
}
