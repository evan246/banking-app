import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRole } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  template: `
    <nz-sider class="sidebar" nzWidth="240px">
      <ul nz-menu nzMode="inline" class="sidebar-menu">
        <ng-container *ngFor="let item of getVisibleMenuItems()">
          <li nz-menu-item class="menu-item"
              [nzSelected]="isActive(item.route)"
              (click)="navigateTo(item.route)">
            <i nz-icon [nzType]="item.icon" class="menu-icon"></i>
            <span class="menu-text">{{ item.title }}</span>
          </li>
        </ng-container>
      </ul>
    </nz-sider>
  `,
  styles: [`
    .sidebar {
      /* participate in the layout: fixed width left column */
      width: 240px;
      flex: 0 0 240px;
      height: calc(100vh - 64px);
      background: var(--white);
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
      overflow: auto;
      z-index: 2;
    }

    /* hide any leftover collapse trigger if present */
    ::ng-deep .ant-layout-sider-trigger {
      display: none !important;
    }

    .sidebar-menu {
      height: auto;
      border-right: none;
      padding-top: 20px;
      display: block;
      align-items: flex-start;
    }

    .sidebar-menu ::ng-deep .ant-menu-item {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      padding: 12px 20px !important;
      justify-content: flex-start !important;
      text-align: left !important;
    }

    .sidebar-menu ::ng-deep .menu-icon {
      font-size: 18px;
      width: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(0,0,0,0.65);
    }

    .sidebar-menu ::ng-deep .menu-text {
      display: inline-block;
      color: rgba(0,0,0,0.85);
      font-weight: 500;
    }

    ::ng-deep .ant-menu-item-selected {
      background-color: rgba(10, 36, 99, 0.1) !important;
      color: var(--primary-navy) !important;
    }

    ::ng-deep .ant-menu-item:hover {
      color: var(--accent-orange) !important;
    }

    ::ng-deep .ant-menu-item-selected::after {
      border-right: 3px solid var(--accent-orange);
    }
  `]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  currentUser$!: Observable<User | null>;
  currentUser: User | null = null;

  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard', roles: ['admin', 'manager', 'customer', 'support'] },
    { title: 'Transactions', icon: 'transaction', route: '/transactions', roles: ['admin', 'manager', 'customer', 'support'] },
    { title: 'Admin Panel', icon: 'setting', route: '/admin', roles: ['admin'] },
    { title: 'User Management', icon: 'team', route: '/admin/users', roles: ['admin', 'manager'] },
    { title: 'Reports', icon: 'bar-chart', route: '/admin/reports', roles: ['admin', 'manager'] },
    { title: 'Profile', icon: 'user', route: '/profile', roles: ['admin', 'manager', 'customer', 'support'] }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getVisibleMenuItems(): MenuItem[] {
    if (!this.currentUser) return [];
    return this.menuItems.filter(item =>
      item.roles.includes(this.currentUser!.role)
    );
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
