import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth
    .ensureUser()
    .pipe(map((user) => (user ? true : router.createUrlTree(['/login'], { queryParams: { redirect: state.url } }))));
};

export const adminGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensureUser().pipe(
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
      }

      return user.role === 'admin' ? true : router.createUrlTree(['/my/reports']);
    })
  );
};

