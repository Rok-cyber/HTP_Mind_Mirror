import { Component, Input } from '@angular/core';

import { PremiumNarrativeReflectionSection } from '../../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';
import {
  getPremiumAdditionalQuestions,
  hasPremiumListItems,
  hasPremiumQuestionGroups,
  trackPremiumText
} from '../../utils/premium-report-section.util';

@Component({
  selector: 'app-premium-reflection-questions-section',
  standalone: true,
  templateUrl: './premium-reflection-questions-section.component.html',
  styleUrl: './premium-reflection-questions-section.component.css'
})
export class PremiumReflectionQuestionsSectionComponent {
  @Input() section: PremiumNarrativeReflectionSection | undefined;

  protected shouldRender(): boolean {
    return this.hasListItems(this.section?.questions) || Boolean(this.section?.featuredQuestion) || this.hasQuestionGroups();
  }

  protected hasQuestionGroups(): boolean {
    return hasPremiumQuestionGroups(this.section);
  }

  protected getAdditionalQuestions(): string[] {
    return getPremiumAdditionalQuestions(this.section, 2);
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
