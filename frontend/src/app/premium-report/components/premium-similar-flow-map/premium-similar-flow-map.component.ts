import { Component, Input, OnChanges } from '@angular/core';

import {
  PremiumSimilarityAnonymousMapPoint,
  PremiumSimilarityAnonymousMapView,
  PremiumSimilarityNearbyAnonymousDot,
  PremiumSimilarityProximityBand
} from '../../models/premium-similarity-map.model';
import { toPremiumSignalLabelText } from '../../utils/premium-report-display-text.util';

@Component({
  selector: 'app-premium-similar-flow-map',
  standalone: true,
  templateUrl: './premium-similar-flow-map.component.html',
  styleUrl: './premium-similar-flow-map.component.css'
})
export class PremiumSimilarFlowMapComponent implements OnChanges {
  @Input() mapView: PremiumSimilarityAnonymousMapView | null = null;
  @Input() eyebrow = 'SIMILAR FLOW MAP';
  @Input() heading = 'Flows Similar to Mine';
  @Input() description = '';
  @Input() titleId = 'similar-flow-map-title';

  protected selectedDot: PremiumSimilarityNearbyAnonymousDot | null = null;

  ngOnChanges(): void {
    if (!this.mapView?.nearbyDots.length) {
      this.selectedDot = null;
      return;
    }

    if (!this.selectedDot || !this.mapView.nearbyDots.some((dot) => dot.anonymousId === this.selectedDot?.anonymousId)) {
      this.selectedDot = this.mapView.nearbyDots[0] ?? null;
    }
  }

  protected selectDot(dot: PremiumSimilarityNearbyAnonymousDot): void {
    this.selectedDot = dot;
  }

  protected toXPercent(value: number): number {
    return this.toPercent(value);
  }

  protected toYPercent(value: number): number {
    return 100 - this.toPercent(value);
  }

  protected getMapPoints(): PremiumSimilarityAnonymousMapPoint[] {
    return this.mapView?.mapPoints ?? [];
  }

  protected getNearbyDots(): PremiumSimilarityNearbyAnonymousDot[] {
    return this.mapView?.nearbyDots ?? [];
  }

  protected getTargetXPercent(): number {
    return this.toXPercent(this.mapView?.target.x ?? 0);
  }

  protected getTargetYPercent(): number {
    return this.toYPercent(this.mapView?.target.y ?? 0);
  }

  protected getNearbyXPercent(dot: PremiumSimilarityNearbyAnonymousDot, index: number): number {
    return this.clampPercent(this.toXPercent(dot.x) + this.getNearbyOffset(index).x);
  }

  protected getNearbyYPercent(dot: PremiumSimilarityNearbyAnonymousDot, index: number): number {
    return this.clampPercent(this.toYPercent(dot.y) + this.getNearbyOffset(index).y);
  }

  protected getProximityLabel(band: PremiumSimilarityProximityBand): string {
    return band === 'very_close' || band === 'close' ? 'Similar Flow Sample' : 'Nearby Flow Sample';
  }

  protected getSelectedSignalLabels(dot: PremiumSimilarityNearbyAnonymousDot | null): string[] {
    if (!dot) {
      return [];
    }

    return [...dot.sharedSignalLabelsKo, ...dot.signalLabelsKo]
      .map((label) => this.toDisplaySignalLabel(label))
      .filter((label, index, labels) => label.length > 0 && labels.indexOf(label) === index)
      .slice(0, 4);
  }

  protected getCommonSignalLabel(label: string): string {
    return this.toDisplaySignalLabel(label);
  }

  protected getDotAriaLabel(dot: PremiumSimilarityNearbyAnonymousDot): string {
    const labels = dot.sharedSignalLabelsKo.length > 0 ? dot.sharedSignalLabelsKo.join(', ') : dot.groupLabel;

    return `Anonymous flow sample: ${labels}`;
  }

  protected trackMapPoint(index: number, point: PremiumSimilarityAnonymousMapPoint): string {
    return point.anonymousId || `map-point-${index}`;
  }

  protected trackNearbyDot(index: number, dot: PremiumSimilarityNearbyAnonymousDot): string {
    return dot.anonymousId || `nearby-dot-${index}`;
  }

  protected trackText(index: number, text: string): string {
    return `${index}-${text}`;
  }

  private toPercent(value: number): number {
    const normalized = (value + 1.2) / 2.4;

    return this.clampPercent(Math.round(normalized * 1000) / 10);
  }

  private clampPercent(value: number): number {
    return Math.max(3, Math.min(97, Math.round(value * 10) / 10));
  }

  private getNearbyOffset(index: number): { x: number; y: number } {
    const angle = index * 2.399963229728653;
    const radius = 0.8 + (index % 4) * 0.45;

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  }

  private toDisplaySignalLabel(label: string): string {
    return toPremiumSignalLabelText(label);
  }
}
