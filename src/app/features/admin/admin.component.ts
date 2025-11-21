import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../../core/services/user.service';
import { User, UserRole } from '../../core/models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzStatisticModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule
  ],
  template: `
    <div class="admin-container">
      <h1 class="page-title">Admin Panel</h1>
      <p class="page-subtitle">Manage users and system settings</p>

      <div class="stats-grid">
        <div class="stat-card">
          <i nz-icon nzType="team" nzTheme="outline"></i>
          <div class="stat-card-value"><nz-statistic [nzValue]="totalUsers" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Total Users</div>
        </div>

        <div class="stat-card orange">
          <i nz-icon nzType="user-add" nzTheme="outline"></i>
          <div class="stat-card-value"><nz-statistic [nzValue]="activeUsers" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Active Users</div>
        </div>

        <div class="stat-card">
          <i nz-icon nzType="crown" nzTheme="outline"></i>
          <div class="stat-card-value"><nz-statistic [nzValue]="adminCount" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Administrators</div>
        </div>

        <div class="stat-card orange">
          <i nz-icon nzType="customer-service" nzTheme="outline"></i>
          <div class="stat-card-value"><nz-statistic [nzValue]="supportCount" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Support Staff</div>
        </div>
      </div>

      <nz-card nzTitle="User Management">
        <div class="actions-bar">
          <nz-input-group [nzPrefix]="prefixIconSearch" style="width: 300px;">
            <input
              type="text"
              nz-input
              placeholder="Search users..."
              [(ngModel)]="searchText"
              (ngModelChange)="onSearch()" />
          </nz-input-group>
          <ng-template #prefixIconSearch>
            <i nz-icon nzType="search"></i>
          </ng-template>

          <nz-select
            [(ngModel)]="filterRole"
            (ngModelChange)="onFilter()"
            nzPlaceHolder="Filter by role"
            style="width: 200px;">
            <nz-option nzValue="" nzLabel="All Roles"></nz-option>
            <nz-option nzValue="admin" nzLabel="Admin"></nz-option>
            <nz-option nzValue="manager" nzLabel="Manager"></nz-option>
            <nz-option nzValue="customer" nzLabel="Customer"></nz-option>
            <nz-option nzValue="support" nzLabel="Support"></nz-option>
          </nz-select>
        </div>

        <nz-table
          #userTable
          [nzData]="filteredUsers"
          [nzLoading]="loading"
          [nzPageSize]="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of userTable.data">
              <td>{{ user.full_name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <nz-tag [nzColor]="getRoleColor(user.role)">
                  {{ user.role | uppercase }}
                </nz-tag>
              </td>
              <td>{{ user.phone || '-' }}</td>
              <td>{{ user.created_at | date: 'short' }}</td>
              <td>
                <button nz-button nzType="link" nzSize="small" (click)="editUser(user)">
                  <i nz-icon nzType="edit"></i>
                </button>
                <button nz-button nzType="link" nzSize="small" nzDanger>
                  <i nz-icon nzType="delete"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>
    </div>

    <nz-modal
      [(nzVisible)]="isModalVisible"
      nzTitle="Edit User"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <form nz-form *ngIf="selectedUser">
          <nz-form-item>
            <nz-form-label>Full Name</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="selectedUser.full_name" name="fullName" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label>Email</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="selectedUser.email" name="email" disabled />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label>Role</nz-form-label>
            <nz-form-control>
              <nz-select [(ngModel)]="selectedUser.role" name="role">
                <nz-option nzValue="admin" nzLabel="Admin"></nz-option>
                <nz-option nzValue="manager" nzLabel="Manager"></nz-option>
                <nz-option nzValue="customer" nzLabel="Customer"></nz-option>
                <nz-option nzValue="support" nzLabel="Support"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label>Phone</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="selectedUser.phone" name="phone" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .admin-container {
      padding: 24px;
    }

    .page-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--primary-navy);
      margin-bottom: 8px;
    }

    .page-subtitle {
      font-size: 16px;
      color: var(--dark-gray);
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 100%);
      color: var(--white);
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(10, 36, 99, 0.2);
      position: relative;
      overflow: hidden;
    }

    .stat-card.orange {
      background: linear-gradient(135deg, var(--accent-orange) 0%, var(--light-orange) 100%);
    }

    .stat-card i {
      font-size: 32px;
      opacity: 0.3;
      position: absolute;
      right: 24px;
      top: 24px;
    }

    .stat-card-value {
      font-size: 32px;
      font-weight: 700;
      margin: 8px 0;
    }

    .stat-card-label {
      font-size: 14px;
      opacity: 0.9;
    }

    .actions-bar {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }

    ::ng-deep .ant-card-head {
      background-color: var(--primary-navy);
      color: var(--white);
    }

    ::ng-deep .ant-card-head-title {
      color: var(--white);
    }
  `]
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchText = '';
  filterRole = '';
  isModalVisible = false;
  selectedUser: User | null = null;

  totalUsers = 0;
  activeUsers = 0;
  adminCount = 0;
  supportCount = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.calculateStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = this.getMockUsers();
        this.filteredUsers = this.users;
        this.calculateStats();
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.length;
    this.adminCount = this.users.filter(u => u.role === 'admin').length;
    this.supportCount = this.users.filter(u => u.role === 'support').length;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchText ||
        user.full_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesRole = !this.filterRole || user.role === this.filterRole;

      return matchesSearch && matchesRole;
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.isModalVisible = false;
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.selectedUser = null;
  }

  getRoleColor(role: string): string {
    const colors: { [key: string]: string } = {
      'admin': 'red',
      'manager': 'blue',
      'customer': 'green',
      'support': 'orange'
    };
    return colors[role] || 'default';
  }

  getMockUsers(): User[] {
    const roles: UserRole[] = ['admin', 'manager', 'customer', 'support'];
    const users: User[] = [];

    for (let i = 1; i <= 20; i++) {
      const role = roles[Math.floor(Math.random() * roles.length)];
      users.push({
        id: `${i}`,
        email: `user${i}@bank.com`,
        full_name: `User ${i}`,
        role: role,
        phone: `555-${String(i).padStart(4, '0')}`,
        created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      });
    }

    return users;
  }
}
