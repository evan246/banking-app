import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <app-card>
        <div class="flex items-center gap-6 mb-6">
          <img
            [src]="user?.avatar"
            alt="Profile"
            class="w-24 h-24 rounded-full border-4 border-primary"
          />
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900">{{ user?.name }}</h2>
            <p class="text-gray-600">{{ user?.email }}</p>
            <app-button variant="outline" size="sm" class="mt-3">
              Change Photo
            </app-button>
          </div>
        </div>
      </app-card>

      <app-card>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Profile Information</h3>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                [value]="user?.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                [value]="user?.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value="+234 801 234 5678"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <app-button type="submit">Save Changes</app-button>
        </form>
      </app-card>

      <app-card>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Notifications</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">Transaction Alerts</p>
              <p class="text-sm text-gray-600">Get notified for every transaction</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">AI Insights</p>
              <p class="text-sm text-gray-600">Daily financial tips and recommendations</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">Savings Goal Reminders</p>
              <p class="text-sm text-gray-600">Get reminded about your goals</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">Marketing Emails</p>
              <p class="text-sm text-gray-600">Receive updates about new features</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </app-card>

      <app-card>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Security</h3>
        <div class="space-y-4">
          <div>
            <app-button variant="outline" [fullWidth]="true">
              Change Password
            </app-button>
          </div>
          <div>
            <app-button variant="outline" [fullWidth]="true">
              Enable Two-Factor Authentication
            </app-button>
          </div>
          <div>
            <app-button variant="outline" [fullWidth]="true">
              Manage Trusted Devices
            </app-button>
          </div>
        </div>
      </app-card>

      <app-card>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Danger Zone</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p class="font-medium text-red-900">Sign Out</p>
              <p class="text-sm text-red-700">Sign out from this device</p>
            </div>
            <app-button variant="outline" (click)="logout()">
              Sign Out
            </app-button>
          </div>

          <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p class="font-medium text-red-900">Delete Account</p>
              <p class="text-sm text-red-700">Permanently delete your account and data</p>
            </div>
            <app-button variant="outline">
              Delete
            </app-button>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUser();
  }

  logout() {
    this.authService.logout();
  }
}
