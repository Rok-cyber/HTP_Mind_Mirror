import { ReportHighlightThresholdType, ReportSummaryTraitState } from '../models/report.model';

export function resolveHighlightState(rawValue: number, thresholdType: ReportHighlightThresholdType): ReportSummaryTraitState {
  switch (thresholdType) {
    case 'A':
      return resolveState(rawValue, 1, 3);
    case 'B':
      return resolveState(rawValue, 1, 4);
    case 'C':
      return resolveState(rawValue, 1, 2);
    case 'D':
      return resolveState(rawValue, 2, 3);
    case 'E':
      return resolveState(rawValue, 3, 4);
  }
}

function resolveState(rawValue: number, activeFrom: number, severeFrom: number): ReportSummaryTraitState {
  if (rawValue >= severeFrom) {
    return 'severe';
  }

  if (rawValue >= activeFrom) {
    return 'active';
  }

  return 'inactive';
}
