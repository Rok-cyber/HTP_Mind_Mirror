import { Component, Input } from '@angular/core';

import { PremiumNarrativeConversationStarterSection } from '../../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';
import { hasPremiumListItems, trackPremiumText } from '../../utils/premium-report-section.util';

@Component({
  selector: 'app-premium-conversation-starter-section',
  standalone: true,
  templateUrl: './premium-conversation-starter-section.component.html',
  styleUrl: './premium-conversation-starter-section.component.css'
})
export class PremiumConversationStarterSectionComponent {
  @Input() section: PremiumNarrativeConversationStarterSection | undefined;

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
