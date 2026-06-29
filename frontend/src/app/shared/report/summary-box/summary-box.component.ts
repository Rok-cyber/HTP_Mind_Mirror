import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-box',
  standalone: true,
  templateUrl: './summary-box.component.html'
})
export class SummaryBoxComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) text = '';
}
