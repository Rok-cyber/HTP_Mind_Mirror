import {
  PremiumNarrativePatternItem,
  PremiumNarrativeQuestionGroup,
  PremiumNarrativeReflectionSection,
  PremiumNarrativeReport,
  PremiumNarrativeResourceItem
} from '../models/premium-narrative-report.model';

export function getPremiumCorePatternItems(
  report: PremiumNarrativeReport | null | undefined
): PremiumNarrativePatternItem[] {
  return report?.corePatternSection?.items ?? [];
}

export function getPremiumTensionPatternItems(
  report: PremiumNarrativeReport | null | undefined
): PremiumNarrativePatternItem[] {
  return report?.tensionSection?.items ?? [];
}

export function getPremiumResourceItems(
  report: PremiumNarrativeReport | null | undefined
): PremiumNarrativeResourceItem[] {
  return report?.resourceSection?.items ?? [];
}

export function hasPremiumListItems(items: readonly string[] | null | undefined): boolean {
  return (items?.length ?? 0) > 0;
}

export function hasPremiumQuestionGroups(section: PremiumNarrativeReflectionSection | null | undefined): boolean {
  return getPremiumQuestionGroups(section).length > 0;
}

export function getPremiumQuestionGroups(
  section: PremiumNarrativeReflectionSection | null | undefined
): PremiumNarrativeQuestionGroup[] {
  return (section?.questionGroups ?? []).filter((group) => hasPremiumListItems(group.questions));
}

export function getPremiumAdditionalQuestions(
  section: PremiumNarrativeReflectionSection | null | undefined,
  limit: number
): string[] {
  const groupedQuestions = new Set(
    section?.questionGroups?.flatMap((group) => group.questions ?? []).filter((question) => question.length > 0) ?? []
  );

  return (section?.questions ?? [])
    .filter((question) => question && question !== section?.featuredQuestion && !groupedQuestions.has(question))
    .slice(0, limit);
}

export function trackPremiumText(index: number, item: string): string {
  return `${index}-${item}`;
}
