import { HttpErrorResponse } from '@angular/common/http';

export function resolvePremiumReportLoadErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      return '로그인이 필요하거나 접근 권한이 없습니다.';
    }

    if (error.status === 404) {
      return '저장된 프리미엄 리포트가 아직 없습니다. 관리자 생성 후 다시 확인해 주세요.';
    }
  }

  return '프리미엄 리포트를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';
}
