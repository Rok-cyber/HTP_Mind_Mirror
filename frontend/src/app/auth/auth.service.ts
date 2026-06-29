import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

import { API_BASE_URL } from '../core/api-base-url.token';

export interface AuthUser {
  mb_no: number;
  mb_id: string;
  mb_name: string;
  mb_type: number;
  mb_status?: number;
  role: 'admin' | 'member';
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly tokenKey = 'htp_auth_token';
  private readonly tokenSignal = signal<string | null>(localStorage.getItem(this.tokenKey));
  private readonly userSignal = signal<AuthUser | null>(null);
  private restoreRequest$: Observable<AuthUser | null> | null = null;

  readonly currentUser = computed(() => this.userSignal());
  readonly isLoggedIn = computed(() => Boolean(this.tokenSignal()));
  readonly isAdmin = computed(() => this.userSignal()?.role === 'admin');

  get token(): string | null {
    return this.tokenSignal();
  }

  login(mbId: string, mbPassword: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/auth/login`, {
        mb_id: mbId,
        mb_password: mbPassword
      })
      .pipe(tap((response) => this.setSession(response.token, response.user)));
  }

  signup(input: { mbId: string; mbPassword: string; mbName: string; mbEmail?: string }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/auth/signup`, {
        mb_id: input.mbId,
        mb_password: input.mbPassword,
        mb_name: input.mbName,
        mb_email: input.mbEmail ?? ''
      })
      .pipe(tap((response) => this.setSession(response.token, response.user)));
  }

  fetchMe(): Observable<AuthUser> {
    return this.http.get<{ user: AuthUser }>(`${this.apiBaseUrl}/auth/me`).pipe(
      map((response) => response.user),
      tap((user) => this.userSignal.set(user))
    );
  }

  restoreSession(): Observable<AuthUser | null> {
    return this.ensureUser();
  }

  ensureUser(): Observable<AuthUser | null> {
    const user = this.userSignal();

    if (user) {
      return of(user);
    }

    if (!this.tokenSignal()) {
      return of(null);
    }

    if (!this.restoreRequest$) {
      this.restoreRequest$ = this.fetchMe().pipe(
        catchError(() => {
          this.clearSession();
          return of(null);
        }),
        finalize(() => {
          this.restoreRequest$ = null;
        }),
        shareReplay(1)
      );
    }

    return this.restoreRequest$;
  }

  logout(): Observable<unknown> {
    return this.http.post(`${this.apiBaseUrl}/auth/logout`, {}).pipe(
      catchError(() => of(null)),
      tap(() => this.clearSession())
    );
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  private setSession(token: string, user: AuthUser): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }
}
