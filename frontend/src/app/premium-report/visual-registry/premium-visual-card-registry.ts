export type PremiumVisualStatus = 'draft' | 'approved' | 'missing' | 'archived';

export interface PremiumArchetypeVisualMeta {
  id: string;
  nameKo: string;
  nameEn: string;
  oneLineKo: string;
  descriptionKo: string;
  imagePath: string;
  fallbackImagePath?: string;
  visualStatus: PremiumVisualStatus;
  representativePatternIds?: string[];
  reflectionQuestionKo?: string;
}

export interface PremiumPatternVisualMeta {
  id: string;
  nameKo: string;
  nameEn?: string;
  oneLineKo?: string;
  imagePath: string;
  fallbackImagePath?: string;
  visualStatus: PremiumVisualStatus;
  layer?: 'core' | 'tension';
}

export interface PremiumResourceVisualMeta {
  id: string;
  nameKo: string;
  nameEn: string;
  imageTitleKo: string;
  oneLineKo: string;
  imagePath: string;
  fallbackImagePath?: string;
  visualStatus: PremiumVisualStatus;
}

export interface PremiumFallbackHeroVisualMeta {
  id: string;
  nameKo: string;
  nameEn: string;
  imageTitleKo: string;
  oneLineKo: string;
  descriptionKo: string;
  imagePath: string;
  fallbackImagePath?: string;
  visualStatus: PremiumVisualStatus;
  reportTagsKo?: string[];
  reflectionQuestionKo?: string;
}

const archetypeImagePath = (id: string): string => `/assets/premium/archetypes/${id}.png`;
const archetypeFallbackImagePath = (id: string): string => `/assets/pattern-cards/${id}.png`;
const patternImagePath = (id: string): string => `/assets/premium/pattern-cards/${id}.png`;
const patternDraftImagePath = (id: string): string => `/assets/premium/pattern-cards/${id}_v01.png`;
const resourceImagePath = (id: string): string => `/assets/premium/resource-cards/${id}.png`;
const resourceDraftImagePath = (id: string): string => `/assets/premium/resource-cards/${id}_v01.png`;
const fallbackHeroImagePath = (id: string): string => `/assets/premium/fallback-heroes/${id}.png`;
const finalPatternImageIds = new Set(['anger_defensiveness']);

export const premiumArchetypeVisualRegistry = [
  {
    id: 'relationship_energy_regulator',
    nameKo: '관계 에너지 조절형',
    nameEn: 'Relationship Energy Regulator',
    oneLineKo: '연결되고 싶은 마음과 관계 에너지를 조절하려는 흐름',
    descriptionKo:
      '이 흐름은 사람과 연결되는 에너지와 관계 장면에서의 피로, 거리조절을 함께 돌아보게 합니다. 가까워지고 싶은 마음과 회복이 필요한 순간을 나누어 살펴볼 수 있습니다.',
    imagePath: archetypeImagePath('relationship_energy_regulator'),
    fallbackImagePath: archetypeFallbackImagePath('relationship_energy_regulator'),
    visualStatus: 'approved',
    representativePatternIds: ['relationship_need_withdrawal', 'withdrawal_conflict', 'extroversion_withdrawal'],
    reflectionQuestionKo: '관계에서 가까워지고 싶은 마음과 거리를 두고 싶은 마음은 각각 언제 나타나나요?'
  },
  {
    id: 'tension_self_protection',
    nameKo: '긴장 자기보호형',
    nameEn: 'Tension Self-Protection',
    oneLineKo: '긴장 속에서 스스로를 보호하려는 흐름',
    descriptionKo:
      '이 흐름은 감정이나 생각을 드러내기 전에 한 번 더 조심하려는 마음과 연결됩니다. 보호가 도움이 되는 순간과 표현을 막는 순간을 구분해볼 수 있습니다.',
    imagePath: archetypeImagePath('tension_self_protection'),
    fallbackImagePath: archetypeFallbackImagePath('tension_self_protection'),
    visualStatus: 'approved',
    representativePatternIds: ['anxiety_defensiveness', 'anxiety_confidence_low', 'confidence_high_anxiety'],
    reflectionQuestionKo: '스스로를 보호하려는 마음이 실제로 도움이 되었던 순간은 언제였나요?'
  },
  {
    id: 'achievement_pressure_regulator',
    nameKo: '성취 압박 조절형',
    nameEn: 'Achievement Pressure Regulator',
    oneLineKo: '목표를 향한 힘과 부담을 함께 조율하는 흐름',
    descriptionKo:
      '이 흐름은 앞으로 나아가고 싶은 마음과 부담을 줄이고 싶은 마음을 함께 살펴봅니다. 성취의 의미와 회복의 필요를 균형 있게 돌아볼 수 있습니다.',
    imagePath: archetypeImagePath('achievement_pressure_regulator'),
    fallbackImagePath: archetypeFallbackImagePath('achievement_pressure_regulator'),
    visualStatus: 'approved',
    representativePatternIds: ['achievement_anxiety', 'achievement_escape'],
    reflectionQuestionKo: '목표를 향한 노력과 쉬어야 한다는 신호는 각각 어떻게 나타나나요?'
  },
  {
    id: 'emotional_suppression_reflector',
    nameKo: '감정 억제 성찰형',
    nameEn: 'Emotional Suppression Reflector',
    oneLineKo: '감정을 바로 드러내기보다 안쪽에서 조절하는 흐름',
    descriptionKo:
      '이 흐름은 감정을 누르거나 다듬은 뒤 표현하려는 경향과 연결됩니다. 참는 것이 관계를 지켜주는 순간과 마음에 오래 남는 순간을 함께 볼 수 있습니다.',
    imagePath: archetypeImagePath('emotional_suppression_reflector'),
    fallbackImagePath: archetypeFallbackImagePath('emotional_suppression_reflector'),
    visualStatus: 'approved',
    representativePatternIds: ['anger_defensiveness', 'hostility_conflict'],
    reflectionQuestionKo: '최근 표현하지 않은 감정 중 아직 마음에 남아 있는 것은 무엇인가요?'
  },
  {
    id: 'self_monitoring_stability_seeker',
    nameKo: '자기검열 안정추구형',
    nameEn: 'Self-Monitoring Stability Seeker',
    oneLineKo: '스스로를 점검하며 안정감을 찾으려는 흐름',
    descriptionKo:
      '이 흐름은 실수나 불확실성을 줄이기 위해 말과 행동을 여러 번 확인하는 마음과 연결됩니다. 점검이 나를 돕는 순간과 지나치게 길어지는 순간을 돌아볼 수 있습니다.',
    imagePath: archetypeImagePath('self_monitoring_stability_seeker'),
    fallbackImagePath: archetypeFallbackImagePath('self_monitoring_stability_seeker'),
    visualStatus: 'approved',
    representativePatternIds: ['compulsion_defensiveness', 'anxiety_compulsion', 'fixation_defensiveness'],
    reflectionQuestionKo: '최근 스스로를 여러 번 점검했던 장면은 나에게 어떤 안정감을 주었나요?'
  },
  {
    id: 'emotional_depletion_recovery',
    nameKo: '정서 소진 회복형',
    nameEn: 'Emotional Depletion Recovery',
    oneLineKo: '낮아진 에너지와 자기확신을 회복하려는 흐름',
    descriptionKo:
      '이 흐름은 정서 에너지와 자기확신이 함께 낮아질 때 필요한 회복의 방향을 살펴봅니다. 더 밀어붙이는 일과 잠시 정리하는 일을 구분해볼 수 있습니다.',
    imagePath: archetypeImagePath('emotional_depletion_recovery'),
    fallbackImagePath: archetypeFallbackImagePath('emotional_depletion_recovery'),
    visualStatus: 'approved',
    representativePatternIds: ['depression_anxiety', 'depression_confidence_low', 'confidence_low_passivity'],
    reflectionQuestionKo: '지금 나에게 더 필요한 것은 새로운 노력인가요, 충분한 회복인가요?'
  },
  {
    id: 'independent_distance_keeper',
    nameKo: '독립 거리유지형',
    nameEn: 'Independent Distance Keeper',
    oneLineKo: '자신만의 기준과 관계적 거리를 함께 살피는 흐름',
    descriptionKo:
      '이 흐름은 혼자만의 공간, 기준, 관계적 연결 사이의 균형을 돌아보게 합니다. 독립성과 친밀감이 서로 다른 시간에 어떻게 필요해지는지 살펴볼 수 있습니다.',
    imagePath: archetypeImagePath('independent_distance_keeper'),
    fallbackImagePath: archetypeFallbackImagePath('independent_distance_keeper'),
    visualStatus: 'approved',
    representativePatternIds: ['autonomy_relationship_need_low', 'autonomy_relationship_need_high'],
    reflectionQuestionKo: '혼자만의 공간이 필요한 순간과 연결이 필요한 순간은 어떻게 달라지나요?'
  },
  {
    id: 'external_expression_inner_protection',
    nameKo: '외부표현-내면보호형',
    nameEn: 'External Expression, Inner Protection',
    oneLineKo: '겉으로 드러나는 표현성과 안쪽의 보호 흐름',
    descriptionKo:
      '이 흐름은 밖으로 보이는 에너지와 스스로 체감하는 조심스러움의 차이를 함께 살펴봅니다. 타인에게 보이는 모습과 내면의 회복 리듬을 나누어 돌아볼 수 있습니다.',
    imagePath: archetypeImagePath('external_expression_inner_protection'),
    fallbackImagePath: archetypeFallbackImagePath('external_expression_inner_protection'),
    visualStatus: 'approved',
    representativePatternIds: ['extroversion_withdrawal', 'relationship_need_high_defensiveness', 'confidence_high_anxiety'],
    reflectionQuestionKo: '타인에게 드러나는 모습과 내가 실제로 체감하는 내면 상태는 어떻게 다른가요?'
  }
] as const satisfies readonly PremiumArchetypeVisualMeta[];

export const premiumPatternVisualRegistry = [
  patternVisual('anxiety_defensiveness', '긴장 자기보호', 'Tension Self-Protection', '긴장 속에서 먼저 스스로를 보호하려는 흐름', 'core'),
  patternVisual('achievement_anxiety', '성취 압박', 'Achievement Pressure', '목표를 향한 마음과 부담이 함께 높아지는 흐름', 'core'),
  patternVisual('relationship_need_withdrawal', '관계 거리조절', 'Relational Distance Regulation', '가까워지고 싶은 마음과 회복 거리를 함께 살피는 흐름', 'core'),
  patternVisual('anger_defensiveness', '감정 억제', 'Contained Emotion', '감정을 바로 드러내기보다 안쪽에서 조절하는 흐름', 'core'),
  patternVisual('depression_confidence_low', '자기위축 흐름', 'Self-Withdrawal Flow', '낮아진 에너지와 자기확신을 함께 돌아보는 흐름', 'core'),
  patternVisual('compulsion_defensiveness', '자기검열', 'Self-Monitoring', '실수나 노출을 줄이기 위해 스스로를 점검하는 흐름', 'core'),
  patternVisual('fixation_defensiveness', '변화 경계', 'Change Guarding', '익숙한 방식 안에서 안정감을 유지하려는 흐름', 'core'),
  patternVisual('hostility_conflict', '관계 긴장 반응', 'Relational Tension Response', '관계 장면에서 긴장과 반응성을 살펴보는 흐름', 'core'),
  patternVisual('autonomy_relationship_need_low', '독립 거리유지', 'Independent Distance Keeping', '혼자만의 기준과 공간을 중요하게 보는 흐름', 'core'),
  patternVisual('escape_passivity', '회피 정체 흐름', 'Avoidant Pause', '부담을 줄이기 위해 잠시 움직임을 낮추는 흐름', 'core'),
  patternVisual('extroversion_withdrawal', '외부활동 vs 관계피로', 'Outer Activity and Relational Fatigue', '외부와 연결되는 에너지와 회복 욕구가 함께 있는 흐름', 'tension'),
  patternVisual('confidence_high_anxiety', '겉 안정감 vs 내부 긴장', 'Outer Stability and Inner Tension', '겉으로 보이는 안정감과 안쪽 긴장을 함께 살피는 흐름', 'tension'),
  patternVisual('relationship_need_high_defensiveness', '연결 욕구 vs 상처 경계', 'Connection Need and Guardedness', '가까워지고 싶은 마음과 조심스러운 보호가 함께 있는 흐름', 'tension'),
  patternVisual('achievement_escape', '전진 욕구 vs 회피 흐름', 'Progress Drive and Avoidant Flow', '앞으로 가고 싶은 마음과 물러서고 싶은 마음의 대비 흐름', 'tension'),
  patternVisual('autonomy_relationship_need_high', '독립성 vs 친밀 욕구', 'Autonomy and Closeness Need', '자신만의 기준과 관계적 연결 욕구가 함께 있는 흐름', 'tension'),
  patternVisual('anxiety_compulsion', '긴장 반복 사고', 'Tension and Repeated Thought', '걱정과 확인이 반복되며 마음이 쉬기 어려운 흐름', 'core'),
  patternVisual('depression_anxiety', '정서 소진', 'Emotional Depletion', '낮은 정서 에너지와 긴장이 함께 나타나는 흐름', 'core'),
  patternVisual('anxiety_confidence_low', '자기확신 저하', 'Lowered Self-Assurance', '긴장 속에서 판단과 선택의 확신이 약해지는 흐름', 'core'),
  patternVisual('confidence_low_passivity', '자기위축 고착', 'Settled Self-Withdrawal', '스스로 나서기보다 한 걸음 물러서려는 흐름', 'core'),
  patternVisual('withdrawal_conflict', '관계 긴장 회피', 'Relational Tension Withdrawal', '관계 긴장을 직접 마주하기보다 거리를 두려는 흐름', 'core')
] as const satisfies readonly PremiumPatternVisualMeta[];

export const premiumResourceVisualRegistry = [
  resourceVisual(
    'emotional_stability_resource',
    '정서 안정 자원',
    'Emotional Stability Resource',
    '정서 안정의 정원',
    '마음을 비교적 안정적으로 붙잡아주는 생활 리듬과 회복 맥락'
  ),
  resourceVisual(
    'recovery_resilience_flow',
    '회복 탄력 흐름',
    'Recovery Resilience Flow',
    '다시 움직이는 작은 불씨',
    '부담 뒤에도 다시 움직일 수 있는 회복의 실마리'
  ),
  resourceVisual(
    'autonomous_balance_flow',
    '자율적 균형감',
    'Autonomous Balance Flow',
    '나만의 중심과 열린 다리',
    '자신의 기준과 관계적 연결 사이에서 균형을 잡으려는 흐름'
  ),
  resourceVisual(
    'open_expression_rhythm',
    '열린 표현 리듬',
    'Open Expression Rhythm',
    '밖으로 흐르는 밝은 목소리',
    '표현과 연결이 비교적 자연스럽게 열릴 수 있는 리듬'
  ),
  resourceVisual(
    'steady_progress_drive',
    '꾸준한 추진력',
    'Steady Progress Drive',
    '천천히 전진하는 길',
    '목표를 향한 움직임을 작은 추진력으로 이어가는 자원'
  ),
  resourceVisual(
    'relational_stability_flow',
    '관계 안정 흐름',
    'Relational Stability Flow',
    '편안한 거리의 등불',
    '관계 장면에서 비교적 안정적인 리듬을 유지하려는 흐름'
  ),
  resourceVisual(
    'flexible_transition_rhythm',
    '유연한 전환 흐름',
    'Flexible Transition Rhythm',
    '계절을 건너는 문',
    '익숙함에만 머무르지 않고 조금씩 전환할 수 있는 여지'
  ),
  resourceVisual(
    'reflective_inner_organization',
    '내면 정리 능력',
    'Reflective Inner Organization',
    '내면을 정리하는 서재',
    '생각과 감정을 안쪽에서 정리하고 의미를 찾으려는 안정 자원'
  )
] as const satisfies readonly PremiumResourceVisualMeta[];

export const premiumFallbackHeroVisualRegistry = [
  fallbackHeroVisual(
    'balance_cue_centered_flow',
    '균형을 돕는 단서 중심 흐름',
    'Balance Cue Centered Flow',
    '균형 단서 중심형',
    '흩어진 안정·회복·전환 단서를 중심으로 현재 흐름을 살펴보는 관점',
    '특정 아키타입으로 묶기보다 현재의 균형을 돕는 단서를 중심으로 살펴볼 수 있는 흐름',
    ['균형 단서', '안정', '회복'],
    '요즘 부담이 쌓였을 때 다시 안정 쪽으로 돌아오게 해준 작은 단서는 무엇인가요?'
  ),
  fallbackHeroVisual(
    'relational_stability_balance_flow',
    '편안한 거리와 관계 안정 흐름',
    'Relational Stability and Comfortable Distance Flow',
    '관계 거리 안정형',
    '편안한 거리와 안정적인 관계 리듬을 함께 살펴보는 흐름',
    '관계 장면에서 큰 긴장보다 비교적 안정적인 거리와 리듬을 살펴볼 수 있는 흐름',
    ['관계 안정', '편안한 거리', '관계 리듬'],
    '최근 비교적 편안하게 유지된 관계의 거리나 대화 방식은 무엇이었나요?'
  ),
  fallbackHeroVisual(
    'inner_organization_balance_flow',
    '내면 정리와 안정 단서 흐름',
    'Inner Organization and Balance Flow',
    '내면 정리 안정형',
    '복잡한 생각과 감정을 정리하며 안정 쪽으로 돌아오는 흐름',
    '생각과 감정을 안쪽에서 정리하고 안정 쪽으로 돌아오는 단서가 함께 보이는 흐름',
    ['내면 정리', '안정 단서', '균형'],
    '최근 복잡한 마음을 정리하는 데 도움이 되었던 기록, 대화, 생각 방식은 무엇인가요?'
  ),
  fallbackHeroVisual(
    'strength_balance_flow',
    '표현 에너지와 균형 단서 흐름',
    'Expression Energy and Balance Flow',
    '표현 균형 조율형',
    '분명한 표현 에너지와 균형 단서를 함께 조율하는 흐름',
    '강점처럼 쓰일 수 있는 표현과 자기확신 흐름을 균형 단서와 함께 살펴보는 흐름',
    ['표현 에너지', '자기확신', '균형 단서'],
    '최근 내 생각이나 선택을 비교적 분명하게 드러냈던 장면은 언제였나요?'
  ),
  fallbackHeroVisual(
    'recovery_restart_flow',
    '회복과 재시작 단서 흐름',
    'Recovery and Restart Cue Flow',
    '회복 재시작형',
    '부담 뒤에도 다시 움직일 수 있는 작은 단서를 찾는 흐름',
    '부담이나 피로가 있더라도 다시 움직일 수 있는 작은 단서를 함께 살펴보는 흐름',
    ['회복', '재시작', '작은 추진력'],
    '최근 지친 뒤에도 다시 움직이게 해준 작은 계기나 환경은 무엇인가요?'
  ),
  fallbackHeroVisual(
    'current_signal_snapshot',
    '현재 주요 신호 요약',
    'Current Signal Snapshot',
    '현재 신호 관찰형',
    '하나의 유형보다 현재 나타난 신호들을 차분히 살펴보는 흐름',
    '하나의 강한 아키타입보다 현재 나타난 몇 가지 신호를 조심스럽게 나누어 살펴보는 흐름',
    ['현재 신호', '요약', '자기점검'],
    '이번 결과에서 가장 먼저 눈에 들어오는 신호는 무엇이며, 최근 생활 장면과 어떻게 연결되나요?'
  )
] as const satisfies readonly PremiumFallbackHeroVisualMeta[];

export function getArchetypeVisualMeta(idOrName: string | null | undefined): PremiumArchetypeVisualMeta | undefined {
  const key = normalizeLookupKey(idOrName);

  if (!key) {
    return undefined;
  }

  return premiumArchetypeVisualRegistry.find(
    (item) => normalizeLookupKey(item.id) === key || normalizeLookupKey(item.nameKo) === key
  );
}

export function getPatternVisualMeta(idOrName: string | null | undefined): PremiumPatternVisualMeta | undefined {
  const key = normalizeLookupKey(idOrName);

  if (!key) {
    return undefined;
  }

  return premiumPatternVisualRegistry.find(
    (item) => normalizeLookupKey(item.id) === key || normalizeLookupKey(item.nameKo) === key
  );
}

export function getResourceVisualMeta(idOrName: string | null | undefined): PremiumResourceVisualMeta | undefined {
  const key = normalizeLookupKey(idOrName);

  if (!key) {
    return undefined;
  }

  return premiumResourceVisualRegistry.find(
    (item) => normalizeLookupKey(item.id) === key || normalizeLookupKey(item.nameKo) === key
  );
}

export function getFallbackHeroVisualMeta(idOrName: string | null | undefined): PremiumFallbackHeroVisualMeta | undefined {
  const key = normalizeLookupKey(idOrName);

  if (!key) {
    return undefined;
  }

  return premiumFallbackHeroVisualRegistry.find(
    (item) =>
      normalizeLookupKey(item.id) === key ||
      normalizeLookupKey(item.nameKo) === key ||
      normalizeLookupKey(item.imageTitleKo) === key
  );
}

export function findFallbackHeroVisualMetaInText(text: string | null | undefined): PremiumFallbackHeroVisualMeta | undefined {
  const normalizedText = normalizeLookupKey(text);

  if (!normalizedText) {
    return undefined;
  }

  return premiumFallbackHeroVisualRegistry.find((item) =>
    [item.id, item.nameKo, item.imageTitleKo, item.nameEn].some((value) => {
      const key = normalizeLookupKey(value);

      return key.length > 0 && normalizedText.includes(key);
    })
  );
}

function patternVisual(
  id: string,
  nameKo: string,
  nameEn: string,
  oneLineKo: string,
  layer: 'core' | 'tension'
): PremiumPatternVisualMeta {
  return {
    id,
    nameKo,
    nameEn,
    oneLineKo,
    imagePath: finalPatternImageIds.has(id) ? patternImagePath(id) : patternDraftImagePath(id),
    fallbackImagePath: finalPatternImageIds.has(id) ? patternDraftImagePath(id) : patternImagePath(id),
    visualStatus: 'draft',
    layer
  };
}

function fallbackHeroVisual(
  id: string,
  nameKo: string,
  nameEn: string,
  imageTitleKo: string,
  oneLineKo: string,
  descriptionKo: string,
  reportTagsKo: string[],
  reflectionQuestionKo: string
): PremiumFallbackHeroVisualMeta {
  return {
    id,
    nameKo,
    nameEn,
    imageTitleKo,
    oneLineKo,
    descriptionKo,
    imagePath: fallbackHeroImagePath(id),
    visualStatus: 'approved',
    reportTagsKo,
    reflectionQuestionKo
  };
}

function resourceVisual(
  id: string,
  nameKo: string,
  nameEn: string,
  imageTitleKo: string,
  oneLineKo: string
): PremiumResourceVisualMeta {
  return {
    id,
    nameKo,
    nameEn,
    imageTitleKo,
    oneLineKo,
    imagePath: resourceImagePath(id),
    fallbackImagePath: resourceDraftImagePath(id),
    visualStatus: 'approved'
  };
}

function normalizeLookupKey(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase().replace(/\s+/g, '_');
}
