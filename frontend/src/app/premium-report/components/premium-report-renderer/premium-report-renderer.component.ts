import { Component, Input } from '@angular/core';

import { PremiumArchetypeHeroCardComponent } from '../premium-archetype-hero-card/premium-archetype-hero-card.component';
import { PremiumConversationStarterSectionComponent } from '../premium-conversation-starter-section/premium-conversation-starter-section.component';
import { PremiumDiscoverySectionComponent } from '../premium-discovery-section/premium-discovery-section.component';
import { PremiumEverydayScenesComponent } from '../premium-everyday-scenes/premium-everyday-scenes.component';
import { PremiumGrowthDirectionSectionComponent } from '../premium-growth-direction-section/premium-growth-direction-section.component';
import { PremiumPatternDetailSectionComponent } from '../premium-pattern-detail-section/premium-pattern-detail-section.component';
import { PremiumPatternCardsSectionComponent } from '../premium-pattern-cards-section/premium-pattern-cards-section.component';
import { PremiumReflectionQuestionsSectionComponent } from '../premium-reflection-questions-section/premium-reflection-questions-section.component';
import { PremiumReflectionExportSectionComponent } from '../premium-reflection-export-section/premium-reflection-export-section.component';
import { PremiumResourceDetailSectionComponent } from '../premium-resource-detail-section/premium-resource-detail-section.component';
import { PremiumSimilarFlowMapComponent } from '../premium-similar-flow-map/premium-similar-flow-map.component';
import {
  PremiumNarrativePatternItem,
  PremiumNarrativeResourceItem,
  PremiumNarrativeReport
} from '../../models/premium-narrative-report.model';
import { PremiumSimilarityAnonymousMapView } from '../../models/premium-similarity-map.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';
import {
  getPremiumCorePatternItems,
  getPremiumResourceItems,
  getPremiumTensionPatternItems,
  hasPremiumListItems,
  trackPremiumText
} from '../../utils/premium-report-section.util';

@Component({
  selector: 'app-premium-report-renderer',
  standalone: true,
  imports: [
    PremiumArchetypeHeroCardComponent,
    PremiumConversationStarterSectionComponent,
    PremiumDiscoverySectionComponent,
    PremiumEverydayScenesComponent,
    PremiumGrowthDirectionSectionComponent,
    PremiumPatternDetailSectionComponent,
    PremiumPatternCardsSectionComponent,
    PremiumReflectionQuestionsSectionComponent,
    PremiumReflectionExportSectionComponent,
    PremiumResourceDetailSectionComponent,
    PremiumSimilarFlowMapComponent
  ],
  templateUrl: './premium-report-renderer.component.html',
  styleUrl: './premium-report-renderer.component.css'
})
export class PremiumReportRendererComponent {
  @Input() report: PremiumNarrativeReport | null = null;
  @Input() similarFlowMap: PremiumSimilarityAnonymousMapView | null = null;
  @Input() contextLabel?: string;

  protected getCorePatternItems(): PremiumNarrativePatternItem[] {
    return getPremiumCorePatternItems(this.report);
  }

  protected getTensionPatternItems(): PremiumNarrativePatternItem[] {
    return getPremiumTensionPatternItems(this.report);
  }

  protected getResourceItems(): PremiumNarrativeResourceItem[] {
    return getPremiumResourceItems(this.report);
  }

  protected getAllPatternItems(): PremiumNarrativePatternItem[] {
    return [...this.getCorePatternItems(), ...this.getTensionPatternItems()];
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
