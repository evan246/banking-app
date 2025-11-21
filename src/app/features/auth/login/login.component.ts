import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzAlertModule,
    NzIconModule
    ,
    NzSpinModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <nz-spin [nzSpinning]="loading">
          <div class="login-header">
          <div class="logo-icon">
            <i nz-icon nzType="bank" nzTheme="fill"></i>
          </div>
          <h1 class="login-title">Enterprise Banking</h1>
          <p class="login-subtitle">Sign in to your account</p>
          </div>

        <nz-alert
          *ngIf="errorMessage"
          nzType="error"
          [nzMessage]="errorMessage"
          nzShowIcon
          nzCloseable
          (nzOnClose)="errorMessage = ''"
          style="margin-bottom: 24px;">
        </nz-alert>

        <form nz-form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <nz-form-item>
            <nz-form-control nzErrorTip="Please enter your email">
              <nz-input-group nzPrefixIcon="user">
                <input
                  type="email"
                  nz-input
                  formControlName="email"
                  placeholder="Email"
                  autocomplete="email" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control nzErrorTip="Please enter your password">
              <nz-input-group nzPrefixIcon="lock">
                <input
                  type="password"
                  nz-input
                  formControlName="password"
                  placeholder="Password"
                  autocomplete="current-password" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <button
              nz-button
              nzType="primary"
              nzBlock
              [nzSize]="'large'"
              [nzLoading]="loading"
              [disabled]="!loginForm.valid || loading"
              type="submit">
              Sign In
            </button>
          </nz-form-item>
        </form>

        <div class="demo-accounts">
          <h3>Demo Accounts</h3>
          <div class="demo-account-list">
            <div class="demo-account" *ngFor="let account of demoAccounts" (click)="useDemoAccount(account)">
              <div class="demo-role">{{ account.role | uppercase }}</div>
              <div class="demo-email">{{ account.email }}</div>
            </div>
          </div>
          <p class="demo-note">Click any demo account to auto-fill credentials</p>
        </div>
        </nz-spin>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 50%, var(--accent-orange) 100%);
      padding: 24px;
    }

    /* Make the card sit visually on the blue background: wider and shorter */
    .login-card {
      background: rgba(10,36,99,0.95); /* deep navy with slight transparency */
      color: var(--white);
      padding: 28px; /* reduced vertical padding */
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(2,6,23,0.45);
      width: 100%;
      max-width: 760px; /* increase width to hold information */
      min-width: 360px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 20px; /* reduce vertical space */
    }

    .logo-icon {
      font-size: 40px;
      color: var(--accent-orange);
      margin-bottom: 10px;
    }

    .login-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 6px;
    }

    .login-subtitle {
      color: rgba(255,255,255,0.85);
      font-size: 13px;
    }

    ::ng-deep .ant-btn-primary {
      background-color: var(--primary-navy);
      border-color: var(--primary-navy);
      height: 45px;
      font-weight: 600;
    }

    ::ng-deep .ant-btn-primary:hover {
      background-color: var(--secondary-navy);
      border-color: var(--secondary-navy);
    }

    /* keep inputs white and compact so they read well on the navy card */
    ::ng-deep .ant-input-affix-wrapper {
      padding: 8px 10px;
      background: #fff;
      border-radius: 6px;
    }

    ::ng-deep .ant-input {
      height: 40px;
      background: transparent;
      color: #111;
    }

    /* ensure form labels / placeholders are readable on dark card */
    ::ng-deep .ant-form-item-label > label,
    ::ng-deep .ant-form-item-explain {
      color: rgba(255,255,255,0.9);
    }

    .demo-accounts {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .demo-accounts h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-navy);
      margin-bottom: 16px;
      text-align: center;
    }

    .demo-account-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 12px;
    }

    .demo-account {
      padding: 10px;
      background: rgba(255,255,255,0.06);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
      color: rgba(255,255,255,0.95);
    }

    .demo-account:hover {
      background: rgba(255,255,255,0.12);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(2,6,23,0.4);
    }

    .demo-role {
      font-weight: 600;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .demo-account:hover .demo-role {
      color: var(--accent-orange);
    }

    .demo-email {
      font-size: 11px;
      opacity: 0.8;
    }

    .demo-note {
      font-size: 12px;
      color: var(--dark-gray);
      text-align: center;
      margin-top: 12px;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  returnUrl = '/dashboard';

  demoAccounts = [
    { email: 'admin@bank.com', password: 'admin123', role: 'admin' },
    { email: 'manager@bank.com', password: 'manager123', role: 'manager' },
    { email: 'customer@bank.com', password: 'customer123', role: 'customer' },
    { email: 'support@bank.com', password: 'support123', role: 'support' }
  ];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    if (this.authService.isAuthenticated) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.message || 'Login failed. Please check your credentials.';
        }
      });
    }
  }

  useDemoAccount(account: { email: string; password: string }): void {
    this.loginForm.patchValue({
      email: account.email,
      password: account.password
    });
  }
}
