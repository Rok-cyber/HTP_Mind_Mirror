export type ReportCategoryKey = 'emotion' | 'adaptation' | 'relationship' | 'tendency';
export type ReportHighlightThresholdType = 'A' | 'B' | 'C' | 'D' | 'E';
export type ReportRawScoreGroup = Record<string, number | undefined>;
export type ReportRawScores = Partial<Record<ReportCategoryKey, ReportRawScoreGroup>>;
export type ReportSummaryTraitTone = 'problem' | 'positive';
export type ReportSummaryTraitState = 'inactive' | 'active' | 'severe';

export interface ReportMetric {
  key: string;
  label: string;
  score: number;
  sourceField: string;
}

export interface ReportDetailCard {
  title: string;
  body: string;
  tone: 'signal' | 'context' | 'support';
}

export interface ReportCategory {
  key: ReportCategoryKey;
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  detail: string;
  detailCards: ReportDetailCard[];
  color: string;
  metrics: ReportMetric[];
}

export interface ReportSummaryTrait {
  key: string;
  label: string;
  sourceField: string;
  rawValue: number;
  thresholdType: ReportHighlightThresholdType;
  tone: ReportSummaryTraitTone;
  state: ReportSummaryTraitState;
}

export interface ReportSummaryGroup {
  key: ReportCategoryKey;
  title: string;
  traits: ReportSummaryTrait[];
}

export interface ReportImage {
  sort?: number;
  filename?: string;
  url?: string;
  label?: string;
  imageUrl?: string;
  note?: string;
}

export interface ReportInfo {
  user: string;
  age?: number;
  date: string;
  type: string;
}

export interface ReportViewModel {
  info: ReportInfo;
  summary: string;
  categories: ReportCategory[];
  images: ReportImage[];
  summaryGroups?: ReportSummaryGroup[];
}

export interface ReportMetricComparison {
  enabled: boolean;
  sampleSize: number;
  percentile: number;
  higherThanYouPct: number;
  ratio10: number;
  rankLabel: string;
  sentence: string;
}

export interface ReportPeerComparison extends Partial<ReportMetricComparison> {
  enabled: boolean;
}

export interface ReportSectionDetailMetric {
  key: string;
  label: string;
  score: number;
  band: 'stable' | 'mild' | 'elevated' | 'high';
  comparisons: {
    overall: ReportMetricComparison;
    peer: ReportPeerComparison;
  };
}

export interface ReportSectionDetail {
  reportId: number;
  section: {
    key: ReportCategoryKey;
    title: string;
    subtitle: string;
    detail?: string;
  };
  subject: {
    name: string;
    age?: number;
    typeLabel: string;
    reportDate: string;
  };
  summary: {
    topSignalKey: string;
    topSignalLabel: string;
    topSignalScore: number;
    sectionAverage: number;
  };
  metrics: ReportSectionDetailMetric[];
  insights: {
    sectionSummary: string;
    surprisingPoint: string;
    gentleAdvice: string;
  };
  reflection: {
    prompts: string[];
  };
  navigation: {
    mainReportUrl: string;
  };
}

export interface ReportReflectionAnswer {
  questionKey: string;
  answerType: string;
  answerText?: string;
  answerJson?: unknown;
}

export interface ReportReflectionResponse {
  answers: ReportReflectionAnswer[];
}

export interface ReportReflectionPayload {
  answers: ReportReflectionAnswer[];
}

export interface ReportReflectionSaveResponse {
  success: boolean;
  savedCount: number;
}
