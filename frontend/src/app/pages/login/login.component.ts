import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { getSafeAuthRedirect } from '../../auth/auth-redirect.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected mbId = '';
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
    this.auth.login(this.mbId.trim(), this.mbPassword).subscribe({
      next: ({ user }) => {
        this.loading = false;
        const redirect = getSafeAuthRedirect(this.redirect, user.role === 'admin');
        void (redirect
          ? this.router.navigateByUrl(redirect)
          : this.router.navigate([user.role === 'admin' ? '/admin/dashboard' : '/my/reports']));
      },
      error: () => {
        this.loading = false;
        this.errorMessage = '아이디 또는 비밀번호를 확인해 주세요.';
      }
    });
  }
}
