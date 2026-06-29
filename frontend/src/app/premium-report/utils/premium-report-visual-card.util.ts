import {
  PremiumNarrativePatternItem,
  PremiumNarrativeResourceItem
} from '../models/premium-narrative-report.model';
import { toPremiumReportDisplayText } from './premium-report-display-text.util';
import {
  getPatternVisualMeta,
  getResourceVisualMeta,
  PremiumPatternVisualMeta,
  PremiumResourceVisualMeta
} from '../visual-registry/premium-visual-card-registry';

export type PremiumReportVisualCardLayer = 'core' | 'tension' | 'resource';

export interface PremiumReportVisualCardViewModel {
  item?: PremiumNarrativePatternItem;
  resource?: PremiumNarrativeResourceItem;
  visualMeta: PremiumPatternVisualMeta | PremiumResourceVisualMeta | undefined;
  imagePath?: string;
  imageVisible: boolean;
  layer: PremiumReportVisualCardLayer;
}

export interface PremiumReportVisualCardOptions {
  coreLimit?: number;
  tensionLimit?: number;
  resourceLimit?: number;
  maxCards?: number;
  hideMissingResourceImages?: boolean;
}

export function buildPremiumReportVisualCards(
  corePatterns: readonly PremiumNarrativePatternItem[],
  tensionPatterns: readonly PremiumNarrativePatternItem[],
  resourcePatterns: readonly PremiumNarrativeResourceItem[],
  options: PremiumReportVisualCardOptions = {}
): PremiumReportVisualCardViewModel[] {
  const coreCards = corePatterns
    .slice(0, options.coreLimit ?? 3)
    .map((item) => toPremiumPatternVisualCard(item, 'core'));
  const tensionCards = tensionPatterns
    .slice(0, options.tensionLimit ?? 2)
    .map((item) => toPremiumPatternVisualCard(item, 'tension'));
  const resourceCards = resourcePatterns
    .slice(0, options.resourceLimit ?? 2)
    .map((resource) => toPremiumResourceVisualCard(resource, options));

  return [...coreCards, ...tensionCards, ...resourceCards].slice(0, options.maxCards ?? 5);
}

export function getPremiumVisualCardLayerLabel(layer: PremiumReportVisualCardLayer): string {
  if (layer === 'resource') {
    return '균형 단서';
  }

  return layer === 'core' ? '핵심 흐름' : '대비 흐름';
}

export function getPremiumVisualCardTitle(card: PremiumReportVisualCardViewModel, fallback = '카드'): string {
  return toPremiumReportDisplayText(card.visualMeta?.nameKo || card.item?.patternName || card.resource?.resourceName || fallback);
}

export function getPremiumVisualCardEnglishName(card: PremiumReportVisualCardViewModel): string | undefined {
  return card.visualMeta?.nameEn;
}

export function getPremiumVisualCardBody(card: PremiumReportVisualCardViewModel): string | undefined {
  const body =
    card.visualMeta?.oneLineKo ||
    card.item?.body ||
    card.item?.reflectionQuestion ||
    card.resource?.body ||
    card.resource?.reflectionQuestion;

  return body ? toPremiumReportDisplayText(body) : undefined;
}

export function getPremiumVisualCardAltTitle(card: PremiumReportVisualCardViewModel): string {
  if (card.visualMeta && 'imageTitleKo' in card.visualMeta) {
    return card.visualMeta.imageTitleKo;
  }

  return getPremiumVisualCardTitle(card);
}

export function getPremiumVisualCardTrackId(index: number, card: PremiumReportVisualCardViewModel): string {
  return (
    card.item?.patternId ||
    card.item?.patternName ||
    card.resource?.resourceId ||
    card.resource?.resourceName ||
    `${card.layer}-${index}`
  );
}

function toPremiumPatternVisualCard(
  item: PremiumNarrativePatternItem,
  layer: 'core' | 'tension'
): PremiumReportVisualCardViewModel {
  const visualMeta = getPatternVisualMeta(item.patternId) ?? getPatternVisualMeta(item.patternName);

  return {
    item,
    visualMeta,
    imagePath: visualMeta?.imagePath,
    imageVisible: Boolean(visualMeta?.imagePath),
    layer
  };
}

function toPremiumResourceVisualCard(
  resource: PremiumNarrativeResourceItem,
  options: PremiumReportVisualCardOptions
): PremiumReportVisualCardViewModel {
  const visualMeta = getResourceVisualMeta(resource.resourceId) ?? getResourceVisualMeta(resource.resourceName);
  const imagePath = options.hideMissingResourceImages && visualMeta?.visualStatus === 'missing' ? undefined : visualMeta?.imagePath;

  return {
    resource,
    visualMeta,
    imagePath,
    imageVisible: Boolean(imagePath),
    layer: 'resource'
  };
}
