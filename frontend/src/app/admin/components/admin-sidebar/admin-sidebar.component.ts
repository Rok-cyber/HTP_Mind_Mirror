import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface AdminNavItem {
  label: string;
  route: string;
}

interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="border-ink/10 bg-white shadow-report lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-64 lg:border-r">
      <div class="px-5 py-5 lg:px-6">
        <a routerLink="/admin/dashboard" class="block text-xs font-extrabold uppercase tracking-[0.18em] text-moss">Admin</a>
        <p class="mt-2 text-xl font-extrabold text-ink">HTP 관리</p>
      </div>

      <nav class="flex gap-2 overflow-x-auto border-t border-ink/10 px-5 py-3 lg:block lg:space-y-6 lg:overflow-visible lg:border-t-0 lg:px-4 lg:py-2">
        @for (group of groups; track group.title) {
          <section class="min-w-[160px] lg:min-w-0">
            <p class="mb-2 px-2 text-xs font-bold uppercase tracking-[0.14em] text-graphite">{{ group.title }}</p>
            <div class="space-y-1">
              @for (item of group.items; track item.route) {
                <a
                  [routerLink]="item.route"
                  class="block rounded-lg border px-3 py-2 text-sm font-extrabold hover:bg-paper"
                  [class.border-moss]="isActive(item.route)"
                  [class.bg-moss]="isActive(item.route)"
                  [class.text-white]="isActive(item.route)"
                  [class.border-transparent]="!isActive(item.route)"
                  [class.text-ink]="!isActive(item.route)"
                >
                  {{ item.label }}
                </a>
              }
            </div>
          </section>
        }
      </nav>
    </aside>
  `
})
export class AdminSidebarComponent {
  constructor(private readonly router: Router) {}

  protected readonly groups: AdminNavGroup[] = [
    {
      title: 'Dashboard',
      items: [{ label: 'Dashboard', route: '/admin/dashboard' }]
    },
    {
      title: 'Sketchbooks',
      items: [
        { label: '스케치북 업로드', route: '/sketchbook/upload' },
        { label: '전체 스케치북', route: '/admin/sketchbooks' },
        { label: '유형 지정 대기', route: '/admin/sketchbooks/untyped' },
        { label: '병합 후보', route: '/admin/sketchbooks/merge-candidates' }
      ]
    },
    {
      title: 'Analysis',
      items: [{ label: '분석항목관리', route: '/admin/analysis-items' }]
    },
    {
      title: 'Members',
      items: [{ label: '멤버 검색', route: '/admin/members' }]
    }
  ];

  protected isActive(route: string): boolean {
    const currentPath = this.router.url.split('?')[0] ?? '';

    if (route === '/admin/members') {
      return currentPath === '/admin/search' || currentPath === '/admin/members' || currentPath.startsWith('/admin/members/');
    }

    if (route === '/admin/analysis-items') {
      return currentPath === '/admin/analysis-items' || currentPath.startsWith('/admin/analysis-items/');
    }

    return currentPath === route;
  }
}
