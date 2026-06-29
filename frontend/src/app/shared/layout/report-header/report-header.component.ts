import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './report-header.component.html'
})
export class ReportHeaderComponent {
  @Input({ required: true }) user = '';
  @Input() age?: number;
  @Input({ required: true }) date = '';
  @Input({ required: true }) type = '';
  @Input() badge = 'Sample Report';
  @Input() title = 'HTP Drawing Report';
  @Input() description = 'A concise report view with scores, category interpretations, and drawing materials.';

  protected get ageLabel(): string {
    return this.age ? `${this.age}` : '';
  }
}
