import {
  ReportCategoryKey,
  ReportHighlightThresholdType,
  ReportRawScoreGroup,
  ReportRawScores,
  ReportSummaryGroup,
  ReportSummaryTraitTone
} from '../models/report.model';
import { resolveHighlightState } from '../utils/highlight-state.util';

interface SummaryTraitConfig {
  key: string;
  label: string;
  sourceField: string;
  thresholdType: ReportHighlightThresholdType;
  tone: ReportSummaryTraitTone;
  readValue: (raw: ReportRawScoreGroup | undefined) => number;
}

const summaryGroupConfig: Record<ReportCategoryKey, { title: string; traits: SummaryTraitConfig[] }> = {
  emotion: {
    title: '정서 문제',
    traits: [
      trait('depression', '우울', 'sr_1_1', 'D', 'problem', field('depression')),
      trait('anxiety', '불안', 'sr_1_2', 'D', 'problem', field('anxiety')),
      trait('compulsion', '강박', 'sr_1_3', 'E', 'problem', field('compulsion')),
      trait('anger', '분노', 'sr_1_4', 'D', 'problem', field('anger'))
    ]
  },
  adaptation: {
    title: '적응 문제',
    traits: [
      trait('self-control', '자기조절 문제', 'sr_2_1', 'E', 'problem', field('self-control')),
      trait('reality-maladaptation', '현실 부적응', 'sr_2_2', 'A', 'problem', field('reality maladaptation')),
      trait('body-maladaptation', '신체 부적응', 'sr_2_3', 'C', 'problem', field('body maladaptation')),
      trait('escape', '도피', 'sr_2_4', 'D', 'problem', field('escape')),
      trait('fixation', '고착', 'sr_2_5', 'E', 'problem', field('fixation'))
    ]
  },
  relationship: {
    title: '대인관계',
    traits: [
      trait('dominance-high', '지배성 높음', 'sr_3_1 - sr_3_1_m', 'C', 'problem', difference('dominance', 'dominance_m')),
      trait('dominance-low', '지배성 낮음', 'sr_3_1_m - sr_3_1', 'C', 'problem', difference('dominance_m', 'dominance')),
      trait('hostility', '적대감', 'sr_3_2', 'A', 'problem', field('hostility')),
      trait('dependency', '의존성', 'sr_3_3 - sr_3_3_m', 'D', 'problem', difference('dependency', 'dependency_m')),
      trait('autonomy', '자율성', 'sr_3_3_m - sr_3_3', 'C', 'positive', difference('dependency_m', 'dependency')),
      trait('withdrawal', '위축', 'sr_3_4', 'A', 'problem', field('withdrawal')),
      trait(
        'relationship-need-high',
        '관계 욕구 높음',
        'sr_3_5 - sr_3_5_m',
        'C',
        'positive',
        difference('relationship need', 'relationship need_m')
      ),
      trait(
        'relationship-need-low',
        '관계 욕구 낮음',
        'sr_3_5_m - sr_3_5',
        'C',
        'problem',
        difference('relationship need_m', 'relationship need')
      ),
      trait('conflict', '갈등', 'sr_3_6', 'C', 'problem', field('conflict'))
    ]
  },
  tendency: {
    title: '사회적 성향',
    traits: [
      trait('confidence-high', '자신감 높음', 'sr_4_1 - sr_4_1_m', 'C', 'positive', difference('confidence', 'confidence_m')),
      trait('confidence-low', '자신감 낮음', 'sr_4_1_m - sr_4_1', 'B', 'problem', difference('confidence_m', 'confidence')),
      trait('activeness', '적극성', 'sr_4_2 - sr_4_2_m', 'C', 'positive', difference('activeness', 'activeness_m')),
      trait('passiveness', '수동성', 'sr_4_2_m - sr_4_2', 'A', 'problem', difference('activeness_m', 'activeness')),
      trait('achievement', '성취욕구', 'sr_4_3', 'D', 'positive', field('achievement')),
      trait('extroversion', '외향성', 'sr_4_4 - sr_4_4_m', 'C', 'positive', difference('extroversion', 'extroversion_m')),
      trait('introversion', '내향성', 'sr_4_4_m - sr_4_4', 'C', 'positive', difference('extroversion_m', 'extroversion')),
      trait('defensiveness', '방어성', 'sr_4_5', 'C', 'problem', field('defensiveness'))
    ]
  }
};

export function toSummaryGroups(raw: ReportRawScores | undefined): ReportSummaryGroup[] {
  return (Object.keys(summaryGroupConfig) as ReportCategoryKey[]).map((category) => ({
    key: category,
    title: summaryGroupConfig[category].title,
    traits: summaryGroupConfig[category].traits.map((traitConfig) => {
      const rawValue = traitConfig.readValue(raw?.[category]);

      return {
        key: traitConfig.key,
        label: traitConfig.label,
        sourceField: traitConfig.sourceField,
        rawValue,
        thresholdType: traitConfig.thresholdType,
        tone: traitConfig.tone,
        state: resolveHighlightState(rawValue, traitConfig.thresholdType)
      };
    })
  }));
}

function trait(
  key: string,
  label: string,
  sourceField: string,
  thresholdType: ReportHighlightThresholdType,
  tone: ReportSummaryTraitTone,
  readValue: SummaryTraitConfig['readValue']
): SummaryTraitConfig {
  return { key, label, sourceField, thresholdType, tone, readValue };
}

function field(key: string): SummaryTraitConfig['readValue'] {
  return (raw) => readRawValue(raw, key);
}

function difference(primaryKey: string, pairedKey: string): SummaryTraitConfig['readValue'] {
  return (raw) => readRawValue(raw, primaryKey) - readRawValue(raw, pairedKey);
}

function readRawValue(raw: ReportRawScoreGroup | undefined, key: string): number {
  const value = Number(raw?.[key]);
  return Number.isFinite(value) ? value : 0;
}
