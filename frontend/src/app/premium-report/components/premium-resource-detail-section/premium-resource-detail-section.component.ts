import { Component, Input } from '@angular/core';

import { PremiumNarrativeResourceSection } from '../../models/premium-narrative-report.model';
import {
  toPremiumRelatedPatternText,
  toPremiumReportDisplayText,
  toPremiumResourceEvidenceText
} from '../../utils/premium-report-display-text.util';
import { hasPremiumListItems, trackPremiumText } from '../../utils/premium-report-section.util';

@Component({
  selector: 'app-premium-resource-detail-section',
  standalone: true,
  templateUrl: './premium-resource-detail-section.component.html',
  styleUrl: './premium-resource-detail-section.component.css'
})
export class PremiumResourceDetailSectionComponent {
  @Input() section: PremiumNarrativeResourceSection | undefined;

  protected hasResourceItems(): boolean {
    return (this.section?.items?.length ?? 0) > 0;
  }

  protected hasListItems(items: string[] | undefined): boolean {
    return hasPremiumListItems(items);
  }

  protected displayReportText(value: string | null | undefined): string {
    return toPremiumReportDisplayText(value);
  }

  protected displayResourceEvidenceText(value: string): string {
    return toPremiumResourceEvidenceText(value);
  }

  protected displayStableEvidenceText(value: string): string {
    return `− ${this.displayResourceEvidenceText(value)}`;
  }

  protected displaySupportiveEvidenceText(value: string): string {
    return `+ ${this.displayResourceEvidenceText(value)}`;
  }

  protected displayRelatedPatternText(value: string): string {
    return toPremiumRelatedPatternText(value);
  }

  protected trackText(index: number, item: string): string {
    return trackPremiumText(index, item);
  }
}
