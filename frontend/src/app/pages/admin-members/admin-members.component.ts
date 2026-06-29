import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';

import { AdminMember, AdminService } from '../../admin/services/admin.service';
import { adminMemberSketchbooksRoute } from '../../admin/utils/admin-navigation.util';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; members: AdminMember[] };

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-members.component.html'
})
export class AdminMembersComponent {
  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);

  protected readonly state$ = this.adminService.getMembers().pipe(
    map((response): PageState => ({ status: 'loaded', members: response.members })),
    startWith({ status: 'loading' } as PageState),
    catchError(() => of({ status: 'error', message: '멤버 목록을 불러올 수 없습니다.' } satisfies PageState))
  );

  protected openMember(member: AdminMember): void {
    this.router.navigate(adminMemberSketchbooksRoute(member.mbNo));
  }
}
