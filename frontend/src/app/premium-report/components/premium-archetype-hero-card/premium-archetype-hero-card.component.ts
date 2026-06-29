import { Component, Input, OnChanges } from '@angular/core';

import { PremiumNarrativeArchetypeSection, PremiumNarrativePatternItem } from '../../models/premium-narrative-report.model';
import {
  getArchetypeVisualMeta,
  getFallbackHeroVisualMeta,
  getPatternVisualMeta,
  findFallbackHeroVisualMetaInText,
  PremiumArchetypeVisualMeta,
  PremiumFallbackHeroVisualMeta
} from '../../visual-registry/premium-visual-card-registry';

type PremiumHeroVisualMeta = PremiumArchetypeVisualMeta | PremiumFallbackHeroVisualMeta;

@Component({
  selector: 'app-premium-archetype-hero-card',
  standalone: true,
  templateUrl: './premium-archetype-hero-card.component.html',
  styleUrl: './premium-archetype-hero-card.component.css'
})
export class PremiumArchetypeHeroCardComponent implements OnChanges {
  @Input() archetype: PremiumNarrativeArchetypeSection | undefined;
  @Input() patterns: PremiumNarrativePatternItem[] = [];

  protected visualMeta: PremiumHeroVisualMeta | undefined;
  protected representativePatternNames: string[] = [];
  protected imageVisible = true;
  protected imagePath: string | undefined;
  protected isFallbackHero = false;

  ngOnChanges(): void {
    const archetypeMeta =
      getArchetypeVisualMeta(this.archetype?.primaryArchetypeId) ??
      getArchetypeVisualMeta(this.archetype?.primaryArchetypeName);
    const fallbackMeta =
      getFallbackHeroVisualMeta(this.archetype?.fallbackHeroId) ??
      findFallbackHeroVisualMetaInText([
        this.archetype?.title,
        this.archetype?.body,
        this.archetype?.reflectionFocus
      ].filter(Boolean).join(' '));

    this.visualMeta = archetypeMeta ?? fallbackMeta;
    this.isFallbackHero = !archetypeMeta && Boolean(fallbackMeta);
    this.representativePatternNames = this.resolveRepresentativePatternNames();
    this.imagePath = this.visualMeta?.imagePath;
    this.imageVisible = true;
  }

  protected get shouldRender(): boolean {
    return Boolean(this.visualMeta || this.archetype?.primaryArchetypeName || this.archetype?.body);
  }

  protected onImageError(): void {
    if (this.imagePath === this.visualMeta?.imagePath && this.visualMeta?.fallbackImagePath) {
      this.imagePath = this.visualMeta.fallbackImagePath;
      return;
    }

    this.imageVisible = false;
  }

  protected get eyebrowText(): string {
    return this.isFallbackHero ? 'Current Flow Reflection' : 'Archetype Reflection';
  }

  protected get heroTitle(): string {
    if (this.isFallbackHero && this.visualMeta && 'imageTitleKo' in this.visualMeta) {
      return this.visualMeta.imageTitleKo;
    }

    return this.visualMeta?.nameKo || this.archetype?.primaryArchetypeName || 'Key Summary Flow';
  }

  protected get heroAltText(): string {
    return `${this.heroTitle} image`;
  }

  private resolveRepresentativePatternNames(): string[] {
    if (this.isFallbackHero && this.visualMeta && 'reportTagsKo' in this.visualMeta) {
      return Array.from(new Set(this.visualMeta.reportTagsKo ?? [])).slice(0, 3);
    }

    const metaPatternIds = new Set(
      this.visualMeta && 'representativePatternIds' in this.visualMeta
        ? this.visualMeta.representativePatternIds ?? []
        : []
    );
    const names = this.patterns
      .filter((pattern) => {
        if (!metaPatternIds.size) {
          return true;
        }

        return Boolean(pattern.patternId && metaPatternIds.has(pattern.patternId));
      })
      .map((pattern) => pattern.patternName ?? getPatternVisualMeta(pattern.patternId)?.nameKo)
      .filter((name): name is string => Boolean(name));

    return Array.from(new Set(names)).slice(0, 3);
  }
}
