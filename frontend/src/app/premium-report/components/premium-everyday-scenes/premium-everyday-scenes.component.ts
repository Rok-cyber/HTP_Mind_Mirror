import { Component, Input } from '@angular/core';

import { PremiumNarrativePatternItem, PremiumNarrativeReport } from '../../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from '../../utils/premium-report-display-text.util';

interface EverydaySceneCard {
  title: string;
  patternName: string;
  scene: string;
}

@Component({
  selector: 'app-premium-everyday-scenes',
  standalone: true,
  templateUrl: './premium-everyday-scenes.component.html',
  styleUrl: './premium-everyday-scenes.component.css'
})
export class PremiumEverydayScenesComponent {
  @Input() report: PremiumNarrativeReport | null = null;

  protected getSceneCards(): EverydaySceneCard[] {
    const seenScenes = new Set<string>();
    const cards: EverydaySceneCard[] = [];

    for (const item of this.getPatternItems()) {
      const patternName = this.displayText(item.patternName);

      for (const rawScene of item.lifeExamples ?? []) {
        const scene = this.displayText(rawScene);

        if (!scene || seenScenes.has(scene)) {
          continue;
        }

        seenScenes.add(scene);
        cards.push({
          title: this.toSceneTitle(cards.length),
          patternName,
          scene
        });

        if (cards.length >= 3) {
          return cards;
        }
      }
    }

    return cards;
  }

  protected trackScene(index: number, card: EverydaySceneCard): string {
    return `${index}-${card.scene}`;
  }

  private getPatternItems(): PremiumNarrativePatternItem[] {
    return [
      ...(this.report?.corePatternSection?.items ?? []),
      ...(this.report?.tensionSection?.items ?? [])
    ];
  }

  private toSceneTitle(index: number): string {
    return ['In relationships', 'When expressing yourself', 'When recovery is needed'][index] ?? 'In daily life';
  }

  private displayText(value: string | null | undefined): string {
    return toPremiumReportDisplayText(value);
  }
}
