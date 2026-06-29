import { Component, Input } from '@angular/core';

import {
  PremiumNarrativePatternItem,
  PremiumNarrativeReport,
  PremiumNarrativeResourceItem
} from '../../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';

interface DiscoveryCard {
  eyebrow: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-premium-discovery-section',
  standalone: true,
  templateUrl: './premium-discovery-section.component.html',
  styleUrl: './premium-discovery-section.component.css'
})
export class PremiumDiscoverySectionComponent {
  @Input() report: PremiumNarrativeReport | null = null;

  protected getCards(): DiscoveryCard[] {
    const cards = [
      this.buildCoreFlowCard(),
      this.buildLinkedSignalCard(),
      this.buildBalanceCard()
    ].filter((card): card is DiscoveryCard => card !== null);

    return cards.slice(0, 3);
  }

  protected displayText(value: string | null | undefined): string {
    return toPremiumReportDisplayText(value);
  }

  protected trackCard(index: number, card: DiscoveryCard): string {
    return `${index}-${card.title}`;
  }

  private buildCoreFlowCard(): DiscoveryCard | null {
    const primaryName = this.displayText(this.report?.archetypeSection?.primaryArchetypeName);
    const fallbackTitle = this.displayText(this.report?.archetypeSection?.title);
    const body = this.firstSentence(this.report?.archetypeSection?.body) || this.firstSentence(this.report?.overallSummary?.body);
    const flowName = primaryName || fallbackTitle;

    if (!flowName && !body) {
      return null;
    }

    return {
      eyebrow: 'Finding 1',
      title: 'The Flow at the Center',
      body: flowName
        ? `Start by reviewing ${flowName}. ${this.toContinuationSentence(body) || 'This is not a fixed personality type, but a readable name for signals currently appearing together.'}`
        : body
    };
  }

  private buildLinkedSignalCard(): DiscoveryCard | null {
    const patterns = this.getPatternItems();
    const first = this.displayText(patterns[0]?.patternName);
    const second = this.displayText(patterns.find((pattern) => this.displayText(pattern.patternName) !== first)?.patternName);
    const body = this.firstSentence(patterns[0]?.body) || this.firstSentence(this.report?.overallSummary?.body);

    if (!first && !body) {
      return null;
    }

    return {
      eyebrow: 'Finding 2',
      title: 'Signals Seen Together',
      body: first && second
        ? `${first} and ${second} appear together. ${this.toContinuationSentence(body) || 'Looking at both flows together gives this result more context.'}`
        : body || `This result can be reviewed around the ${first} flow.`
    };
  }

  private buildBalanceCard(): DiscoveryCard | null {
    const resource = this.getResourceItems()[0];
    const resourceName = this.displayText(resource?.resourceName);
    const resourceBody = this.firstSentence(resource?.body);
    const suggestion = this.displayText(this.report?.growthDirectionSection?.suggestions?.[0]);

    if (!resourceName && !resourceBody && !suggestion) {
      return null;
    }

    return {
      eyebrow: 'Finding 3',
      title: 'Direction for Balance',
      body: resourceName
        ? `Also review ${resourceName}. ${resourceBody || suggestion || 'This cue helps review the current flow with balance rather than weight alone.'}`
        : resourceBody || suggestion
    };
  }

  private getPatternItems(): PremiumNarrativePatternItem[] {
    return [
      ...(this.report?.corePatternSection?.items ?? []),
      ...(this.report?.tensionSection?.items ?? [])
    ].filter((item) => this.displayText(item.patternName) || this.displayText(item.body));
  }

  private getResourceItems(): PremiumNarrativeResourceItem[] {
    return (this.report?.resourceSection?.items ?? []).filter(
      (item) => this.displayText(item.resourceName) || this.displayText(item.body)
    );
  }

  private firstSentence(value: string | null | undefined): string {
    const text = this.displayText(value);

    if (!text) {
      return '';
    }

    const sentence = text.match(/.*?(?:[.!?。！？])/u)?.[0];

    return sentence?.trim() || text;
  }

  private toContinuationSentence(value: string | null | undefined): string {
    return this.firstSentence(value)
      .replace(/^In this\s+(result|report),?\s*/iu, '')
      .trim();
  }

  private withAndJosa(value: string): string {
    return value;
  }

  private withSubjectJosa(value: string): string {
    return value;
  }

  private hasFinalConsonant(value: string): boolean {
    const lastChar = value.trim().charAt(value.trim().length - 1);
    const code = lastChar.charCodeAt(0);

    if (code < 0xac00 || code > 0xd7a3) {
      return false;
    }

    return (code - 0xac00) % 28 !== 0;
  }
}
