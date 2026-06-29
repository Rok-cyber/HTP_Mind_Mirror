import { Component, Input } from '@angular/core';

import {
  PremiumNarrativePatternItem,
  PremiumNarrativePatternSection
} from '../../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';
import { hasPremiumListItems, trackPremiumText } from '../../utils/premium-report-section.util';

@Component({
  selector: 'app-premium-pattern-detail-section',
  standalone: true,
  templateUrl: './premium-pattern-detail-section.component.html',
  styleUrl: './premium-pattern-detail-section.component.css'
})
export class PremiumPatternDetailSectionComponent {
  @Input() section: PremiumNarrativePatternSection | undefined;
  @Input() kicker = 'Evidence Patterns';
  @Input() defaultTitle = 'Core Patterns';
  @Input() cardLabel = 'Evidence Flow';
  @Input() cardFallbackTitle = 'Pattern';
  @Input() tone: 'default' | 'tension' = 'default';

  protected hasPatternItems(): boolean {
    return (this.section?.items?.length ?? 0) > 0;
  }

  protected hasPatternRichness(item: PremiumNarrativePatternItem): boolean {
    return this.hasListItems(item.lifeExamples) || this.hasListItems(item.whenThisAppears) || this.hasListItems(item.growthHints);
  }

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
