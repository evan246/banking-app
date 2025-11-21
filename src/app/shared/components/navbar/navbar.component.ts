import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzAvatarModule,
    NzToolTipModule
  ],
  template: `
    <nz-header class="navbar">
      <div class="navbar-content">
        <div class="navbar-left">
          <span class="logo">
            <i nz-icon nzType="bank" nzTheme="fill"></i>
            Enterprise Bank
          </span>
        </div>
        <div class="navbar-right" *ngIf="currentUser$ | async as user">
          <a nz-dropdown [nzDropdownMenu]="menu" nzTrigger="click" aria-label="User menu">
            <nz-avatar [nzText]="(user.full_name || '').charAt(0)" [nzSize]="40" class="nav-avatar" nz-tooltip [nzTooltipTitle]="user.full_name || ''"></nz-avatar>
          </a>

          <nz-dropdown-menu #menu="nzDropdownMenu">
            <div class="dropdown-header">
              <div class="dh-name">{{ user.full_name }}</div>
              <div class="dh-role">{{ user.role | uppercase }}</div>
            </div>
            <ul nz-menu>
              <li nz-menu-item (click)="navigateTo('/profile')">
                <i nz-icon nzType="user"></i>
                Profile
              </li>
              <li nz-menu-divider></li>
              <li nz-menu-item (click)="logout()">
                <i nz-icon nzType="logout"></i>
                Logout
              </li>
            </ul>
          </nz-dropdown-menu>
        </div>
      </div>
    </nz-header>
  `,
  styles: [`
    .navbar {
      /* keep header in normal document flow so layout body doesn't need offsets */
      position: relative;
      z-index: 1000;
      background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 100%);
      padding: 0 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      max-width: 1180px;
      margin: 0 auto;
    }

    .logo {
      color: var(--white);
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    nz-avatar.nav-avatar {
      cursor: pointer;
      background-color: var(--accent-orange);
      border: 2px solid var(--white);
      height: 40px;
      width: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    
    /* collapse space previously used by user text */
    .navbar-right a[nz-dropdown] { display: inline-flex; align-items: center; }

    .dropdown-header {
      padding: 12px 16px;
      background: linear-gradient(180deg, rgba(10,36,99,0.06), transparent);
      border-bottom: 1px solid rgba(0,0,0,0.04);
      text-align: left;
    }

    .dropdown-header .dh-name {
      font-weight: 700;
      color: var(--primary-navy);
    }

    .dropdown-header .dh-role {
      font-size: 11px;
      color: rgba(0,0,0,0.45);
      margin-top: 4px;
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  private router = inject(Router);

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}
