import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { AdminPremiumPayload, AdminService } from '../../admin/services/admin.service';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; payload: AdminPremiumPayload; sbNo: string };

@Component({
  selector: 'app-admin-premium-payload',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './admin-premium-payload.component.html'
})
export class AdminPremiumPayloadComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly adminService = inject(AdminService);

  protected readonly state$ = this.route.paramMap.pipe(
    map((params) => params.get('sbNo') ?? ''),
    switchMap((sbNo) =>
      this.adminService.getPremiumPayload(sbNo).pipe(
        map((payload): PageState => ({ status: 'loaded', payload, sbNo })),
        startWith({ status: 'loading' } as PageState),
        catchError(() => of({ status: 'error', message: '프리미엄 페이로드를 불러올 수 없습니다.' } satisfies PageState))
      )
    )
  );

  protected signalStrengthLabel(strength: string | undefined): string {
    if (strength === 'strong') {
      return '강하게 나타난 신호';
    }

    if (strength === 'moderate') {
      return '조금 더 두드러진 신호';
    }

    if (strength === 'mild') {
      return '가볍게 살펴볼 신호';
    }

    return '참고 신호';
  }

  protected displayValue(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '선택 안 함';
    }

    return String(value);
  }
}
