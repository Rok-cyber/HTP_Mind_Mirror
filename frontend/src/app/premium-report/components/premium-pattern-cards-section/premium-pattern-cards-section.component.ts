import { Component, Input, OnChanges } from '@angular/core';

import {
  PremiumNarrativePatternItem,
  PremiumNarrativeResourceItem
} from '../../models/premium-narrative-report.model';
import {
  buildPremiumReportVisualCards,
  getPremiumVisualCardAltTitle,
  getPremiumVisualCardBody,
  getPremiumVisualCardEnglishName,
  getPremiumVisualCardLayerLabel,
  getPremiumVisualCardTitle,
  getPremiumVisualCardTrackId,
  PremiumReportVisualCardLayer,
  PremiumReportVisualCardViewModel
} from '../../utils/premium-report-visual-card.util';

@Component({
  selector: 'app-premium-pattern-cards-section',
  standalone: true,
  templateUrl: './premium-pattern-cards-section.component.html',
  styleUrl: './premium-pattern-cards-section.component.css'
})
export class PremiumPatternCardsSectionComponent implements OnChanges {
  @Input() corePatterns: PremiumNarrativePatternItem[] = [];
  @Input() tensionPatterns: PremiumNarrativePatternItem[] = [];
  @Input() resourcePatterns: PremiumNarrativeResourceItem[] = [];

  protected cards: PremiumReportVisualCardViewModel[] = [];

  ngOnChanges(): void {
    this.cards = buildPremiumReportVisualCards(this.corePatterns, this.tensionPatterns, this.resourcePatterns, {
      hideMissingResourceImages: true
    });
  }

  protected onImageError(card: PremiumReportVisualCardViewModel): void {
    if (card.imagePath === card.visualMeta?.imagePath && card.visualMeta?.fallbackImagePath) {
      card.imagePath = card.visualMeta.fallbackImagePath;
      return;
    }

    card.imageVisible = false;
  }

  protected trackCard(index: number, card: PremiumReportVisualCardViewModel): string {
    return getPremiumVisualCardTrackId(index, card);
  }

  protected getCardTitle(card: PremiumReportVisualCardViewModel): string {
    return getPremiumVisualCardTitle(card);
  }

  protected getCardEnglishName(card: PremiumReportVisualCardViewModel): string | undefined {
    return getPremiumVisualCardEnglishName(card);
  }

  protected getCardCopy(card: PremiumReportVisualCardViewModel): string | undefined {
    return getPremiumVisualCardBody(card);
  }

  protected getCardAlt(card: PremiumReportVisualCardViewModel): string {
    return `${getPremiumVisualCardAltTitle(card) || this.getCardTitle(card)} card image`;
  }

  protected getLayerLabel(layer: PremiumReportVisualCardLayer): string {
    return getPremiumVisualCardLayerLabel(layer);
  }

  protected getSectionEyebrow(): string {
    return this.hasPatternCards ? 'PATTERN & BALANCE CARDS' : 'BALANCE CARDS';
  }

  protected getSectionTitle(): string {
    return this.hasPatternCards ? 'Key Cards to Review' : 'Balance Support Cards';
  }

  protected getSectionDescription(): string {
    if (!this.hasPatternCards) {
      return 'A quick preview of cues that may help restore steadiness when pressure builds.';
    }

    if (this.hasResourceCards) {
      return 'A quick card-based preview of tension flows and balancing cues in this report.';
    }

    return 'A quick card-based preview of the core and contrast flows in this report.';
  }

  private get hasPatternCards(): boolean {
    return this.cards.some((card) => card.layer !== 'resource');
  }

  private get hasResourceCards(): boolean {
    return this.cards.some((card) => card.layer === 'resource');
  }
}
