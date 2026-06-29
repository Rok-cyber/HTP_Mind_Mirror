import { Component, Input } from '@angular/core';

import { PremiumNarrativeGrowthDirectionSection } from '../../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';
import { hasPremiumListItems, trackPremiumText } from '../../utils/premium-report-section.util';

@Component({
  selector: 'app-premium-growth-direction-section',
  standalone: true,
  templateUrl: './premium-growth-direction-section.component.html',
  styleUrl: './premium-growth-direction-section.component.css'
})
export class PremiumGrowthDirectionSectionComponent {
  @Input() section: PremiumNarrativeGrowthDirectionSection | undefined;

  protected hasListItems(items: string[] | undefined): boolean {
    return hasPremiumListItems(items);
  }

  protected displayReportText(value: string | null | undefined): string {
    return toPremiumReportDisplayText(value);
  }

  protected trackText(index: number, item: string): string {
    return trackPremiumText(index, item);
  }
}
