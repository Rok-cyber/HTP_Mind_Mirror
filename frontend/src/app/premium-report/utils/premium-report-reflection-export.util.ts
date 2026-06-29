import {
  PremiumNarrativePatternItem,
  PremiumNarrativeReport,
  PremiumNarrativeResourceItem
} from '../models/premium-narrative-report.model';
import { toPremiumRelatedPatternText, toPremiumReportDisplayText } from './premium-report-display-text.util';

const defaultSafetyNote =
  '이 자료는 HTP 기반의 자기성찰 참고자료이며, 진단이나 치료를 대신하지 않습니다.';

export function buildPremiumAiReflectionPrompt(report: PremiumNarrativeReport): string {
  const note = buildPremiumReflectionMarkdown(report);

  return [
    '아래 자료는 HTP 기반 자기성찰 리포트입니다.',
    '진단이나 치료처럼 해석하지 말고, 나를 특정 성격 유형으로 확정하지도 말아주세요.',
    '',
    '대화 규칙:',
    '- 나를 진단하지 마세요.',
    '- 병명, 위험군, 정상/비정상 같은 표현을 쓰지 마세요.',
    '- 리포트 내용을 절대적 사실처럼 말하지 마세요.',
    '- 질문 중심으로 천천히 도와주세요.',
    '- 최근 생활 장면, 감정 흐름, 관계 리듬, 작은 실험을 중심으로 대화해주세요.',
    '- 답변은 짧고 따뜻하게 해주세요.',
    '',
    '대화 목표:',
    '1. 내가 가장 공감하는 흐름 찾기',
    '2. 최근 생활 장면과 연결하기',
    '3. 도움이 되는 균형 단서 찾기',
    '4. 이번 주 작은 실험 하나 정하기',
    '',
    '먼저 내가 답하기 쉬운 질문 3개만 해주세요.',
    '',
    note
  ].join('\n');
}

export function buildPremiumReflectionMarkdown(report: PremiumNarrativeReport): string {
  const sections: string[] = [];
  const title = clean(report.title) || 'HTP 자기성찰 노트';

  sections.push(`# ${title}`);
  sections.push(
    [
      '## 안내',
      clean(report.safetyNote) || defaultSafetyNote,
      '',
      '외부 AI 도구에 붙여넣을 경우, 해당 서비스의 개인정보 및 데이터 이용 정책이 적용됩니다.'
    ].join('\n')
  );

  addTextSection(sections, '한 줄 요약', report.oneLineSummary);
  addTextSection(sections, clean(report.overallSummary?.title) || '전체 흐름', report.overallSummary?.body);
  addArchetypeSection(sections, report);
  addPatternSection(sections, '함께 살펴볼 주요 흐름', [
    ...(report.corePatternSection?.items ?? []),
    ...(report.tensionSection?.items ?? [])
  ]);
  addResourceSection(sections, report.resourceSection?.items ?? []);
  addTextSection(sections, clean(report.mbtiHtpComparisonSection?.title) || 'MBTI 비교 맥락', report.mbtiHtpComparisonSection?.body);
  addReflectionSection(sections, report);
  addGrowthSection(sections, report);
  addConversationSection(sections, report);

  return sections.filter(Boolean).join('\n\n').trim();
}

function addTextSection(sections: string[], title: string, body: string | null | undefined): void {
  const resolvedBody = clean(body);

  if (!resolvedBody) {
    return;
  }

  sections.push([`## ${title}`, resolvedBody].join('\n'));
}

function addArchetypeSection(sections: string[], report: PremiumNarrativeReport): void {
  const archetype = report.archetypeSection;

  if (!archetype?.body && !archetype?.primaryArchetypeName && !archetype?.reflectionFocus) {
    return;
  }

  const lines = ['## 현재 흐름 요약'];
  const name = clean(archetype.primaryArchetypeName);
  const body = clean(archetype.body);
  const focus = clean(archetype.reflectionFocus);

  if (name) {
    lines.push(`### ${name}`);
  }

  if (body) {
    lines.push(body);
  }

  if (focus) {
    lines.push('', `돌아볼 질문: ${focus}`);
  }

  sections.push(lines.join('\n'));
}

function addPatternSection(sections: string[], title: string, items: PremiumNarrativePatternItem[]): void {
  const lines = items
    .map((item) => {
      const name = clean(item.patternName);
      const body = clean(item.body);
      const question = clean(item.reflectionQuestion);
      const examples = toCleanList(item.lifeExamples).slice(0, 2);
      const hints = toCleanList(item.growthHints).slice(0, 2);
      const block: string[] = [];

      if (!name && !body && !question && examples.length === 0 && hints.length === 0) {
        return '';
      }

      block.push(`### ${name || '흐름 카드'}`);

      if (body) {
        block.push(body);
      }

      if (examples.length > 0) {
        block.push('', '생활 장면:');
        block.push(...examples.map((example) => `- ${example}`));
      }

      if (hints.length > 0) {
        block.push('', '작은 힌트:');
        block.push(...hints.map((hint) => `- ${hint}`));
      }

      if (question) {
        block.push('', `돌아볼 질문: ${question}`);
      }

      return block.join('\n');
    })
    .filter(Boolean);

  if (lines.length === 0) {
    return;
  }

  sections.push([`## ${title}`, ...lines].join('\n\n'));
}

function addResourceSection(sections: string[], items: PremiumNarrativeResourceItem[]): void {
  const lines = items
    .map((item) => {
      const name = clean(item.resourceName);
      const body = clean(item.body);
      const question = clean(item.reflectionQuestion);
      const relatedPatterns = toCleanList(item.relatedPatterns).map(toPremiumRelatedPatternText).filter(Boolean).slice(0, 3);
      const block: string[] = [];

      if (!name && !body && !question && relatedPatterns.length === 0) {
        return '';
      }

      block.push(`### ${name || '균형 단서'}`);

      if (body) {
        block.push(body);
      }

      if (relatedPatterns.length > 0) {
        block.push('', '함께 살펴볼 흐름:');
        block.push(...relatedPatterns.map((pattern) => `- ${pattern}`));
      }

      if (question) {
        block.push('', `돌아볼 질문: ${question}`);
      }

      return block.join('\n');
    })
    .filter(Boolean);

  if (lines.length === 0) {
    return;
  }

  sections.push(['## 균형을 돕는 단서', ...lines].join('\n\n'));
}

function addReflectionSection(sections: string[], report: PremiumNarrativeReport): void {
  const section = report.reflectionSection;
  const questions = [
    clean(section?.featuredQuestion),
    ...toCleanList(section?.questions),
    ...(section?.questionGroups ?? []).flatMap((group) => toCleanList(group.questions))
  ]
    .filter(Boolean)
    .filter(uniqueOnly)
    .slice(0, 7);

  if (questions.length === 0) {
    return;
  }

  sections.push(['## 돌아볼 질문', ...questions.map((question) => `- ${question}`)].join('\n'));
}

function addGrowthSection(sections: string[], report: PremiumNarrativeReport): void {
  const section = report.growthDirectionSection;
  const lines: string[] = [];
  const body = clean(section?.body);
  const suggestions = toCleanList(section?.suggestions).slice(0, 3);
  const experiments = toCleanList(section?.smallExperiments).slice(0, 3);
  const questions = toCleanList(section?.nextStepQuestions).slice(0, 2);

  if (body) {
    lines.push(body);
  }

  if (suggestions.length > 0) {
    lines.push('', '제안:');
    lines.push(...suggestions.map((item) => `- ${item}`));
  }

  if (experiments.length > 0) {
    lines.push('', '이번 주 작은 실험:');
    lines.push(...experiments.map((item) => `- ${item}`));
  }

  if (questions.length > 0) {
    lines.push('', '다음 질문:');
    lines.push(...questions.map((item) => `- ${item}`));
  }

  if (lines.length === 0) {
    return;
  }

  sections.push(['## 작은 실험과 다음 단계', ...lines].join('\n'));
}

function addConversationSection(sections: string[], report: PremiumNarrativeReport): void {
  const starters = toCleanList(report.conversationStarterSection?.starters).slice(0, 3);

  if (starters.length === 0) {
    return;
  }

  sections.push(['## 대화 시작 문장', ...starters.map((starter) => `- ${starter}`)].join('\n'));
}

function toCleanList(items: string[] | null | undefined): string[] {
  return (items ?? []).map(clean).filter(Boolean);
}

function clean(value: string | null | undefined): string {
  return toPremiumReportDisplayText(value).trim();
}

function uniqueOnly(value: string, index: number, values: string[]): boolean {
  return values.indexOf(value) === index;
}
