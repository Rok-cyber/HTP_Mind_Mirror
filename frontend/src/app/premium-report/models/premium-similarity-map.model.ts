export type PremiumSimilarityMapMarkerStyle =
  | 'current_flow_halo'
  | 'nearby_anonymous_dot'
  | 'background_density_dot';

export type PremiumSimilarityProximityBand = 'very_close' | 'close' | 'nearby';

export interface PremiumSimilarityAnonymousMapPoint {
  anonymousId: string;
  x: number;
  y: number;
  markerStyle: 'background_density_dot';
  groupLabel: string;
  signalLabelsKo: string[];
}

export interface PremiumSimilarityTargetMapMarker {
  x: number;
  y: number;
  markerStyle: 'current_flow_halo';
  groupLabel: string;
  signalLabelsKo: string[];
  labelKo: '내 리포트 흐름';
}

export interface PremiumSimilarityNearbyAnonymousDot {
  anonymousId: string;
  x: number;
  y: number;
  markerStyle: 'nearby_anonymous_dot';
  groupLabel: string;
  signalLabelsKo: string[];
  sharedSignalLabelsKo: string[];
  proximityBand: PremiumSimilarityProximityBand;
}

export interface PremiumSimilarityCommonSignal {
  labelKo: string;
  count: number;
  ratio: number;
}

export interface PremiumSimilarityAnonymousMapView {
  mapVersion: 'premium-similarity-anonymous-map-v1';
  generatedAt: string;
  titleKo: '익명 흐름 지도';
  captionKo: string;
  target: PremiumSimilarityTargetMapMarker;
  mapPoints: PremiumSimilarityAnonymousMapPoint[];
  nearbyDots: PremiumSimilarityNearbyAnonymousDot[];
  commonSignals: PremiumSimilarityCommonSignal[];
  privacyNoticeKo: string;
  interactionGuidanceKo: string;
  warnings: string[];
}

export interface PremiumSimilarFlowMapResponse {
  ok: boolean;
  sbNo: number;
  anonymousMapView: PremiumSimilarityAnonymousMapView;
}
