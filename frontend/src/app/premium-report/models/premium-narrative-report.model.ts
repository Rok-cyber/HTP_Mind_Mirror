export interface PremiumNarrativeReport {
  schemaVersion?: 'premium-narrative-report-v1' | 'premium-narrative-report-v1.1' | 'premium-narrative-report-v1.2';
  source?: PremiumNarrativeSource;
  title?: string;
  oneLineSummary?: string;
  overallSummary?: PremiumNarrativeTextSection;
  archetypeSection?: PremiumNarrativeArchetypeSection;
  corePatternSection?: PremiumNarrativePatternSection;
  tensionSection?: PremiumNarrativePatternSection;
  resourceSection?: PremiumNarrativeResourceSection;
  mbtiHtpComparisonSection?: PremiumNarrativeMbtiSection;
  reflectionSection?: PremiumNarrativeReflectionSection;
  growthDirectionSection?: PremiumNarrativeGrowthDirectionSection;
  conversationStarterSection?: PremiumNarrativeConversationStarterSection;
  safetyNote?: string;
  meta?: PremiumNarrativeReportMeta;
}

export interface PremiumReportRecordSummary {
  prNo: number;
  sbNo: number;
  schemaVersion: string;
  provider: string;
  model: string;
  status: string;
  generatedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface PremiumReportLatestResponse {
  ok: boolean;
  record: PremiumReportRecordSummary;
  report: PremiumNarrativeReport;
  usage?: unknown | null;
}

export interface PremiumReportUsageSummary {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
}

export interface PremiumReportHistoryItem extends PremiumReportRecordSummary {
  mbNo?: number | null;
  usage?: PremiumReportUsageSummary | null;
}

export interface PremiumReportHistoryResponse {
  ok: boolean;
  sbNo: number;
  items: PremiumReportHistoryItem[];
}

export interface PremiumNarrativeSource {
  generatedFrom?: 'llm_report_input';
  llmInputSchemaVersion?: string;
  generationMode?: 'template_mock' | 'llm_generated';
}

export interface PremiumNarrativeTextSection {
  title?: string;
  body?: string;
}

export interface PremiumNarrativeArchetypeSection {
  title?: string;
  primaryArchetypeId?: string | null;
  primaryArchetypeName?: string | null;
  fallbackHeroId?: string | null;
  body?: string;
  secondaryNotes?: string[];
  reflectionFocus?: string;
}

export interface PremiumNarrativePatternSection {
  title?: string;
  intro?: string;
  items?: PremiumNarrativePatternItem[];
}

export interface PremiumNarrativePatternItem {
  patternId?: string | null;
  patternName?: string;
  body?: string;
  evidence?: string[];
  lifeExamples?: string[];
  whenThisAppears?: string[];
  growthHints?: string[];
  reflectionQuestion?: string;
}

export interface PremiumNarrativeResourceSection {
  title?: string;
  intro?: string;
  items?: PremiumNarrativeResourceItem[];
}

export interface PremiumNarrativeResourceItem {
  resourceId?: string | null;
  resourceName?: string;
  body?: string;
  evidenceLevel?: 'subtle' | 'available' | 'clear' | string;
  evidenceLabel?: string;
  stableEvidence?: string[];
  supportiveEvidence?: string[];
  relatedPatterns?: string[];
  reflectionQuestion?: string;
}

export interface PremiumNarrativeMbtiSection {
  title?: string;
  available?: boolean;
  body?: string;
  keySignals?: string[];
}

export interface PremiumNarrativeReflectionSection {
  title?: string;
  intro?: string;
  questions?: string[];
  featuredQuestion?: string;
  questionGroups?: PremiumNarrativeQuestionGroup[];
}

export interface PremiumNarrativeQuestionGroup {
  title?: string;
  questions?: string[];
}

export interface PremiumNarrativeGrowthDirectionSection extends PremiumNarrativeTextSection {
  suggestions?: string[];
  smallExperiments?: string[];
  nextStepQuestions?: string[];
}

export interface PremiumNarrativeConversationStarterSection {
  title?: string;
  intro?: string;
  starters?: string[];
}

export interface PremiumNarrativeReportMeta {
  language?: 'ko';
  nonDiagnostic?: boolean;
  generatedAt?: string;
  warnings?: string[];
}
