import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AdminSidebarComponent } from './admin/components/admin-sidebar/admin-sidebar.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminSidebarComponent, RouterLink, RouterOutlet],
  template: `
    @if (isAdminRoute) {
      <app-admin-sidebar />
      <div class="lg:pl-64">
        <router-outlet />
      </div>
    } @else {
      <header class="app-shell-header border-b border-ink/10 bg-white px-5 py-3 sm:px-8 lg:px-10">
        <nav class="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <a routerLink="/sample-report" class="text-sm font-extrabold uppercase tracking-[0.16em] text-moss">HTP</a>
          <div class="flex items-center gap-3">
            @if (auth.currentUser(); as user) {
              <span class="hidden text-sm font-bold text-graphite sm:inline">{{ user.mb_name || user.mb_id }}</span>
              <a routerLink="/my/reports" class="text-sm font-extrabold text-ink">내 리포트</a>
              <button type="button" class="text-sm font-extrabold text-moss" (click)="logout()">로그아웃</button>
            } @else {
              <a routerLink="/login" class="text-sm font-extrabold text-ink">로그인</a>
            }
          </div>
        </nav>
      </header>
      <router-outlet />
    }
  `
})
export class AppComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  protected isAdminRoute = false;

  constructor(private readonly router: Router) {
    this.isAdminRoute = this.router.url.startsWith('/admin');
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin');
    });
  }

  ngOnInit(): void {
    this.auth.restoreSession().subscribe();
  }

  protected logout(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
