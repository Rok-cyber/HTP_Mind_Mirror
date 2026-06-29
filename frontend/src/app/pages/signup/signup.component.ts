import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { getSafeAuthRedirect } from '../../auth/auth-redirect.util';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected mbId = '';
  protected mbName = '';
  protected mbEmail = '';
  protected mbPassword = '';
  protected loading = false;
  protected errorMessage = '';
  protected readonly redirect = this.route.snapshot.queryParamMap.get('redirect');

  protected submit(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.auth
      .signup({
        mbId: this.mbId.trim(),
        mbName: this.mbName.trim(),
        mbEmail: this.mbEmail.trim() || undefined,
        mbPassword: this.mbPassword
      })
      .subscribe({
        next: () => {
          this.loading = false;
          const redirect = getSafeAuthRedirect(this.redirect);
          void (redirect ? this.router.navigateByUrl(redirect) : this.router.navigate(['/my/reports']));
        },
        error: (error: unknown) => {
          this.loading = false;
          this.errorMessage = getSignupErrorMessage(error);
        }
      });
  }
}

function getSignupErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 409) {
      return '이미 사용 중인 아이디입니다';
    }

    if (error.status === 400) {
      return '입력값을 확인해주세요';
    }
  }

  return '회원가입 중 오류가 발생했습니다';
}
