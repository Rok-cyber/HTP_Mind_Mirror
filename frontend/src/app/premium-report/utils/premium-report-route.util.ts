import { ParamMap } from '@angular/router';

export interface PremiumReportRouteParams {
  sbNo: string;
  prNo: string;
}

export type PremiumReportRouteValidation =
  | {
      valid: true;
      sbNo: string;
      prNo?: string;
    }
  | {
      valid: false;
      message: string;
    };

const numericRouteParamPattern = /^\d+$/;

export function getPremiumReportRouteParams(params: ParamMap): PremiumReportRouteParams {
  return {
    sbNo: params.get('sbNo') ?? '',
    prNo: params.get('prNo') ?? ''
  };
}

export function validatePremiumReportRouteParams(params: PremiumReportRouteParams): PremiumReportRouteValidation {
  if (!numericRouteParamPattern.test(params.sbNo)) {
    return {
      valid: false,
      message: '올바른 프리미엄 리포트 번호가 아닙니다.'
    };
  }

  if (params.prNo && !numericRouteParamPattern.test(params.prNo)) {
    return {
      valid: false,
      message: '올바른 프리미엄 리포트 버전 번호가 아닙니다.'
    };
  }

  return {
    valid: true,
    sbNo: params.sbNo,
    ...(params.prNo ? { prNo: params.prNo } : {})
  };
}
