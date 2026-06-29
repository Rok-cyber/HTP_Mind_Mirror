import {
  ReportCategory,
  ReportCategoryKey,
  ReportImage,
  ReportInfo,
  ReportRawScores,
  ReportViewModel
} from './report.model';
import { toSummaryGroups } from '../mappers/summary-grid.mapper';

export interface EmotionalScores {
  depression: number;
  anxiety: number;
  compulsion: number;
  anger: number;
}

export interface AdaptationScores {
  'self-control': number;
  'reality maladaptation': number;
  'body maladaptation': number;
  escape: number;
  fixation: number;
}

export interface RelationshipScores {
  dominance: number;
  hostility: number;
  dependency: number;
  withdrawal: number;
  'relationship need': number;
  conflict: number;
}

export interface TendencyScores {
  confidence: number;
  activeness: number;
  achievement: number;
  extroversion: number;
  defensiveness: number;
}

export interface ReportDetails {
  emotion: string;
  adaptation: string;
  relationship: string;
  tendency: string;
}

export interface ReportApiResponse {
  info: ReportInfo;
  images: ReportImage[];
  emotion: EmotionalScores;
  adaptation: AdaptationScores;
  relationship: RelationshipScores;
  tendency: TendencyScores;
  raw?: ReportRawScores;
  summary: string;
  details: ReportDetails;
}

const categoryMeta: Record<ReportCategoryKey, Omit<ReportCategory, 'summary' | 'detail' | 'detailCards' | 'metrics'>> = {
  emotion: {
    key: 'emotion',
    title: '정서 문제',
    eyebrow: '정서 영역',
    description: '우울, 불안, 강박, 분노와 관련된 정서 영역 지표입니다.',
    color: '#D46A5A'
  },
  adaptation: {
    key: 'adaptation',
    title: '적응 문제',
    eyebrow: '적응 영역',
    description: '자기통제, 현실 부적응, 신체 부적응, 도피, 고착과 관련된 적응 영역 지표입니다.',
    color: '#D9A441'
  },
  relationship: {
    key: 'relationship',
    title: '대인관계',
    eyebrow: '관계 영역',
    description: '지배성, 적대감, 의존성, 위축, 관계 욕구, 갈등과 관련된 대인관계 지표입니다.',
    color: '#49675F'
  },
  tendency: {
    key: 'tendency',
    title: '사회적 성향',
    eyebrow: '사회적 성향 영역',
    description: '자신감, 활동성, 성취성, 외향성, 방어성과 관련된 사회적 성향 지표입니다.',
    color: '#A8C7D7'
  }
};

const metricMap = {
  emotion: [
    ['depression', '우울', 'sr_1_1'],
    ['anxiety', '불안', 'sr_1_2'],
    ['compulsion', '강박', 'sr_1_3'],
    ['anger', '분노', 'sr_1_4']
  ],
  adaptation: [
    ['self-control', '자기통제', 'sr_2_1'],
    ['reality maladaptation', '현실 부적응', 'sr_2_2'],
    ['body maladaptation', '신체 부적응', 'sr_2_3'],
    ['escape', '도피', 'sr_2_4'],
    ['fixation', '고착', 'sr_2_5']
  ],
  relationship: [
    ['dominance', '지배성', 'sr_3_1'],
    ['hostility', '적대감', 'sr_3_2'],
    ['dependency', '의존성', 'sr_3_3'],
    ['withdrawal', '위축', 'sr_3_4'],
    ['relationship need', '관계 욕구', 'sr_3_5'],
    ['conflict', '갈등', 'sr_3_6']
  ],
  tendency: [
    ['confidence', '자신감', 'sr_4_1'],
    ['activeness', '활동성', 'sr_4_2'],
    ['achievement', '성취성', 'sr_4_3'],
    ['extroversion', '외향성', 'sr_4_4'],
    ['defensiveness', '방어성', 'sr_4_5']
  ]
} as const;

export function toReportViewModel(report: ReportApiResponse): ReportViewModel {
  return {
    info: {
      user: report.info?.user || '검사 대상 정보 없음',
      age: report.info?.age,
      date: report.info?.date || '날짜 정보 없음',
      type: report.info?.type || '검사 유형 정보 없음'
    },
    summary: report.summary || '종합 해석 문구가 아직 등록되지 않았습니다.',
    images: report.images ?? [],
    categories: [
      toCategory('emotion', report.emotion, report.details?.emotion),
      toCategory('adaptation', report.adaptation, report.details?.adaptation),
      toCategory('relationship', report.relationship, report.details?.relationship),
      toCategory('tendency', report.tendency, report.details?.tendency)
    ],
    summaryGroups: toSummaryGroups(report.raw)
  };
}

function toCategory(
  category: ReportCategoryKey,
  scores: ReportApiResponse[ReportCategoryKey],
  detail = '세부 해석 문구가 아직 등록되지 않았습니다.'
): ReportCategory {
  return {
    ...categoryMeta[category],
    summary: summarizeCategory(category, scores),
    detail,
    detailCards: [
      {
        title: '점수 기준',
        body: `${categoryMeta[category].eyebrow}의 표시 점수입니다. 50점을 기준으로 해석합니다.`,
        tone: 'context'
      }
    ],
    metrics: metricMap[category].map(([key, label, sourceField]) => ({
      key,
      label,
      sourceField,
      score: readScore(scores, key)
    }))
  };
}

function summarizeCategory(category: ReportCategoryKey, scores: ReportApiResponse[ReportCategoryKey]): string {
  const topMetric = metricMap[category]
    .map(([key, label]) => ({ label, score: readScore(scores, key) }))
    .sort((a, b) => b.score - a.score)[0];

  return `이 범주에서는 ${topMetric.label} 지표가 ${topMetric.score}점으로 가장 두드러지게 나타납니다.`;
}

function readScore(scores: ReportApiResponse[ReportCategoryKey] | undefined, key: string): number {
  if (!scores) {
    return 0;
  }

  const value = scores[key as keyof typeof scores];
  const score = Number(value);

  return Number.isFinite(score) ? score : 0;
}
