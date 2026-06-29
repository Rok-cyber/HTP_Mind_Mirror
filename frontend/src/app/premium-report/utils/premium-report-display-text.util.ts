import {
  getPatternVisualMeta,
  premiumPatternVisualRegistry
} from '../visual-registry/premium-visual-card-registry';

const resourceFeatureLabelKo: Record<string, string> = {
  depression: '정서 에너지 저하',
  anxiety: '긴장',
  compulsion: '반복 점검',
  anger: '감정 반응',
  self_control_problem: '자기조절 부담',
  reality_maladaptation: '현실 과제 부담',
  body_maladaptation: '몸의 긴장',
  escape: '일시적 거리두기',
  fixation: '생각의 머무름',
  hostility: '대인 경계',
  withdrawal: '관계 거리두기',
  conflict: '관계 불편감',
  relationship_need_high: '연결 욕구',
  relationship_need_low: '낮은 관계 요구',
  confidence_high: '자기확신',
  confidence_low: '자기확신 저하',
  initiative: '움직임 에너지',
  passivity: '움직임 저하',
  achievement_need: '성취 욕구',
  extroversion: '외부 표현 에너지',
  defensiveness: '자기보호'
};

export function toPremiumReportDisplayText(value: string | null | undefined): string {
  let result = stripInternalFieldPrefixes(value ?? '');
  result = replaceResourceWording(result);

  for (const [featureKey, label] of Object.entries(resourceFeatureLabelKo)) {
    result = replaceInternalToken(result, featureKey, label);
  }

  for (const pattern of premiumPatternVisualRegistry) {
    result = replaceInternalToken(result, pattern.id, pattern.nameKo);
  }

  return removeDuplicateParentheticalLabels(result);
}

export function toPremiumResourceEvidenceText(value: string): string {
  return toPremiumReportDisplayText(toUserFacingResourceLabel(stripResourceDirectionSuffix(value)));
}

export function toPremiumRelatedPatternText(value: string): string {
  return toPremiumReportDisplayText(toUserFacingPatternLabel(value));
}

export function toPremiumSignalLabelText(label: string): string {
  return label.replace(/^(주요 흐름|보조 흐름|대체 히어로|핵심 패턴|대비 패턴|강점\/표현 패턴|균형 단서):\s*/u, '').trim();
}

function toUserFacingResourceLabel(value: string): string {
  const normalized = normalizeInternalLabel(value);

  return resourceFeatureLabelKo[normalized] ?? getPatternVisualMeta(normalized)?.nameKo ?? value;
}

function toUserFacingPatternLabel(value: string): string {
  const normalized = normalizeInternalLabel(value);

  return getPatternVisualMeta(normalized)?.nameKo ?? resourceFeatureLabelKo[normalized] ?? value;
}

function stripInternalFieldPrefixes(value: string): string {
  return value
    .replace(/relatedAdjustmentPatternIds:\s*/g, '')
    .replace(/sourceFeatures:\s*/g, '')
    .replace(/stableFeatures:\s*/g, '')
    .replace(/supportiveFeatures:\s*/g, '');
}

function replaceResourceWording(value: string): string {
  return value
    .replace(/아키타입\(고수준 요약\)/g, '현재 흐름 요약')
    .replace(/Pattern & Resource Cards/g, 'Pattern & Balance Cards')
    .replace(/자원 흐름/g, '균형 단서')
    .replace(/가볍게 확인되는 자원/g, '가볍게 확인되는 균형 단서')
    .replace(/비교적 뚜렷한 안정 자원/g, '비교적 뚜렷한 안정 단서')
    .replace(/안정 자원/g, '안정 단서')
    .replace(/안정의 자원/g, '안정을 돕는 단서')
    .replace(/안정 신호/g, '과도하게 높지는 않은 신호')
    .replace(/도움 신호/g, '균형을 돕는 신호')
    .replace(/자원 질문/g, '돌아볼 질문')
    .replace(/자원입니다/g, '단서입니다');
}

function stripResourceDirectionSuffix(value: string): string {
  return value
    .replace(/\((?:낮거나\s*)?가볍게 관찰된 신호\)/g, '')
    .replace(/\(과도하게 높지는 않은 신호\)/g, '')
    .replace(/\(균형을 돕는 신호\)/g, '')
    .trim();
}

function removeDuplicateParentheticalLabels(value: string): string {
  let result = value;

  for (const pattern of premiumPatternVisualRegistry) {
    result = result.replace(
      new RegExp(`${escapeRegExp(pattern.nameKo)}\\(${escapeRegExp(pattern.nameKo)}\\)`, 'g'),
      pattern.nameKo
    );
  }

  return result.replace(/(^|[“"‘'\s])([^()“"‘'\n]{1,40})\(\2\)/g, (_match, prefix: string, label: string) => `${prefix}${label}`);
}

function normalizeInternalLabel(value: string): string {
  return value
    .trim()
    .replace(/^[a-zA-Z_]+:\s*/, '')
    .replace(/\(.+\)$/, '')
    .trim();
}

function replaceInternalToken(value: string, token: string, replacement: string): string {
  return value.replace(new RegExp(`(^|[^A-Za-z0-9_])${escapeRegExp(token)}(?=$|[^A-Za-z0-9_])`, 'g'), `$1${replacement}`);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
