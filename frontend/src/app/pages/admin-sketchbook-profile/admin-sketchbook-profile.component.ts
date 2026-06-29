import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';

import { AdminService, AdminSketchbookProfileResponse } from '../../admin/services/admin.service';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; sbNo: string; profile: AdminSketchbookProfileResponse };

const mbtiTypes = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP'
] as const;

@Component({
  selector: 'app-admin-sketchbook-profile',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-sketchbook-profile.component.html',
  styleUrl: './admin-sketchbook-profile.component.css'
})
export class AdminSketchbookProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly adminService = inject(AdminService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly mbtiTypes = mbtiTypes;
  protected saving = false;
  protected notice = '';
  protected error = '';
  protected currentSbNo = '';
  protected readonly form = this.formBuilder.group({
    mbtiSelf: [''],
    mbtiOthers: ['']
  });

  protected readonly state$: Observable<PageState> = this.route.paramMap.pipe(
    map((params) => params.get('sbNo') ?? ''),
    switchMap((sbNo) => {
      this.currentSbNo = sbNo;
      this.notice = '';
      this.error = '';

      if (!/^\d+$/.test(sbNo)) {
        return of({
          status: 'error',
          message: '올바른 스케치북 번호가 아닙니다.'
        } satisfies PageState);
      }

      return this.adminService.getSketchbookProfile(sbNo).pipe(
        map((profile): PageState => {
          this.form.setValue({
            mbtiSelf: profile.profile.self ?? '',
            mbtiOthers: profile.profile.others ?? ''
          });

          return { status: 'loaded', sbNo, profile };
        }),
        startWith({ status: 'loading' } as PageState),
        catchError(() =>
          of({
            status: 'error',
            message: '스케치북 MBTI 정보를 불러올 수 없습니다.'
          } satisfies PageState)
        )
      );
    }),
    startWith({ status: 'loading' } as PageState)
  );

  protected save(): void {
    if (!this.currentSbNo || this.saving) {
      return;
    }

    this.saving = true;
    this.notice = '';
    this.error = '';

    this.adminService
      .updateSketchbookProfile(this.currentSbNo, {
        mbti_self: normalizeMbtiFormValue(this.form.value.mbtiSelf),
        mbti_others: normalizeMbtiFormValue(this.form.value.mbtiOthers)
      })
      .subscribe({
        next: (response) => {
          this.form.setValue({
            mbtiSelf: response.profile.self ?? '',
            mbtiOthers: response.profile.others ?? ''
          });
          this.notice = 'MBTI 정보가 저장되었습니다.';
          this.saving = false;
        },
        error: () => {
          this.error = 'MBTI 정보를 저장하지 못했습니다.';
          this.saving = false;
        }
      });
  }
}

function normalizeMbtiFormValue(value: string | null | undefined): string | null {
  const normalized = value?.trim().toUpperCase() ?? '';
  return normalized.length > 0 ? normalized : null;
}
