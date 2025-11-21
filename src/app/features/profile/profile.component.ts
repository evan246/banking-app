import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzAvatarModule,
    
  ],
  template: `
    <div class="profile-container">
      <h1 class="page-title">Profile</h1>
      <p class="page-subtitle">Manage your account information</p>

      <div nz-row [nzGutter]="24">
        <div nz-col [nzSpan]="8">
          <nz-card nzTitle="Profile Picture">
            <div class="avatar-section">
              <nz-avatar
                [nzText]="(currentUser?.full_name?.charAt(0)) || 'U'"
                [nzSize]="120"
                class="profile-avatar">
              </nz-avatar>
              <button nz-button nzType="default" class="upload-btn">
                Change Picture
              </button>
            </div>
          </nz-card>

          <nz-card nzTitle="Account Info" class="info-card">
            <div class="info-item">
              <span class="info-label">User ID:</span>
              <span class="info-value">{{ currentUser?.id?.substring(0, 8) || '' }}...</span>
            </div>
            <div class="info-item">
              <span class="info-label">Role:</span>
              <span class="info-value role-badge">{{ currentUser?.role | uppercase }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Member Since:</span>
              <span class="info-value">{{ currentUser?.created_at | date: 'mediumDate' }}</span>
            </div>
          </nz-card>
        </div>

        <div nz-col [nzSpan]="16">
          <nz-card nzTitle="Personal Information">
            <form nz-form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <nz-form-item>
                <nz-form-label nzRequired>Full Name</nz-form-label>
                <nz-form-control nzErrorTip="Please enter your full name">
                  <input nz-input formControlName="full_name" placeholder="Full Name" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Email</nz-form-label>
                <nz-form-control>
                  <input nz-input formControlName="email" placeholder="Email" [disabled]="true" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label>Phone Number</nz-form-label>
                <nz-form-control>
                  <input nz-input formControlName="phone" placeholder="Phone Number" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control>
                  <button
                    nz-button
                    nzType="primary"
                    [nzLoading]="loading"
                    [disabled]="!profileForm.valid || loading"
                    type="submit">
                    Update Profile
                  </button>
                  <button
                    nz-button
                    nzType="default"
                    type="button"
                    (click)="resetForm()"
                    style="margin-left: 8px;">
                    Cancel
                  </button>
                </nz-form-control>
              </nz-form-item>
            </form>
          </nz-card>

          <nz-card nzTitle="Change Password" class="password-card">
            <form nz-form [formGroup]="passwordForm" (ngSubmit)="onPasswordSubmit()">
              <nz-form-item>
                <nz-form-label nzRequired>Current Password</nz-form-label>
                <nz-form-control nzErrorTip="Please enter your current password">
                  <input
                    nz-input
                    type="password"
                    formControlName="currentPassword"
                    placeholder="Current Password" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>New Password</nz-form-label>
                <nz-form-control nzErrorTip="Password must be at least 6 characters">
                  <input
                    nz-input
                    type="password"
                    formControlName="newPassword"
                    placeholder="New Password" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Confirm Password</nz-form-label>
                <nz-form-control nzErrorTip="Passwords do not match">
                  <input
                    nz-input
                    type="password"
                    formControlName="confirmPassword"
                    placeholder="Confirm Password" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control>
                  <button
                    nz-button
                    nzType="primary"
                    [nzLoading]="passwordLoading"
                    [disabled]="!passwordForm.valid || passwordLoading"
                    type="submit">
                    Change Password
                  </button>
                </nz-form-control>
              </nz-form-item>
            </form>
          </nz-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
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

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .profile-avatar {
      background-color: var(--accent-orange);
      font-size: 48px;
      font-weight: 700;
    }

    .upload-btn {
      width: 100%;
    }

    .info-card {
      margin-top: 24px;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--medium-gray);
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .info-label {
      font-weight: 600;
      color: var(--primary-navy);
    }

    .info-value {
      color: var(--dark-gray);
    }

    .role-badge {
      background-color: var(--accent-orange);
      color: var(--white);
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .password-card {
      margin-top: 24px;
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
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  loading = false;
  passwordLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          full_name: user.full_name,
          email: user.email,
          phone: user.phone || ''
        });
      }
    });
  }

  initForms(): void {
    this.profileForm = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      this.loading = true;
      const updates = this.profileForm.value;

      this.userService.updateUser(this.currentUser.id, updates).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Profile updated successfully');
        },
        error: (error) => {
          this.loading = false;
          this.message.error('Failed to update profile');
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        this.message.error('Passwords do not match');
        return;
      }

      this.passwordLoading = true;
      setTimeout(() => {
        this.passwordLoading = false;
        this.message.success('Password changed successfully');
        this.passwordForm.reset();
      }, 1000);
    }
  }

  resetForm(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        full_name: this.currentUser.full_name,
        email: this.currentUser.email,
        phone: this.currentUser.phone || ''
      });
    }
  }
}
