import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { Account } from '../../shared/models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">My Accounts</h1>
          <p class="text-gray-600 mt-1">Manage your banking accounts</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <app-card *ngFor="let account of accounts" [hoverable]="true">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <app-badge [variant]="getAccountBadge(account.type)" size="sm">
                  {{ account.type | uppercase }}
                </app-badge>
                <h3 class="text-xl font-bold text-gray-900 mt-2">{{ account.name }}</h3>
              </div>
              <div class="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-500">Available Balance</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ account.currency }}{{ formatNumber(account.balance) }}</p>
            </div>

            <div class="pt-4 border-t border-gray-200 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Account Number</span>
                <span class="font-medium text-gray-900">{{ account.accountNumber }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Last Updated</span>
                <span class="font-medium text-gray-900">{{ getRelativeTime(account.lastUpdated) }}</span>
              </div>
            </div>

            <div class="flex gap-2 pt-4">
              <button class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium">
                Transfer
              </button>
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Details
              </button>
            </div>
          </div>
        </app-card>
      </div>

      <app-card>
        <h2 class="text-xl font-bold text-gray-900 mb-4">Account Summary</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-4 bg-green-50 rounded-lg">
            <p class="text-sm text-green-700 font-medium">Total Assets</p>
            <p class="text-2xl font-bold text-green-900 mt-2">₦{{ formatNumber(getTotalBalance()) }}</p>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-700 font-medium">Active Accounts</p>
            <p class="text-2xl font-bold text-blue-900 mt-2">{{ accounts.length }}</p>
          </div>
          <div class="p-4 bg-purple-50 rounded-lg">
            <p class="text-sm text-purple-700 font-medium">Monthly Growth</p>
            <p class="text-2xl font-bold text-purple-900 mt-2">+12.5%</p>
          </div>
        </div>
      </app-card>

      <app-card>
        <h2 class="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div class="space-y-3">
          <div *ngFor="let activity of recentActivity" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ activity.description }}</p>
                <p class="text-sm text-gray-500">{{ activity.date }}</p>
              </div>
            </div>
            <p class="font-semibold" [class.text-green-600]="activity.type === 'credit'" [class.text-red-600]="activity.type === 'debit'">
              {{ activity.type === 'credit' ? '+' : '-' }}₦{{ formatNumber(activity.amount) }}
            </p>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  recentActivity: any[] = [
    { description: 'Salary Payment', amount: 50000, type: 'credit', date: 'Nov 1, 2025' },
    { description: 'Netflix Subscription', amount: 8000, type: 'debit', date: 'Nov 18, 2025' },
    { description: 'Transfer to Savings', amount: 20000, type: 'debit', date: 'Nov 15, 2025' },
    { description: 'Freelance Payment', amount: 15000, type: 'credit', date: 'Nov 10, 2025' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.accounts = this.dataService.getAccounts();
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  getTotalBalance(): number {
    return this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }

  getAccountBadge(type: string): 'primary' | 'success' | 'info' {
    switch(type) {
      case 'checking': return 'primary';
      case 'savings': return 'success';
      case 'investment': return 'info';
      default: return 'primary';
    }
  }

  getRelativeTime(date: Date): string {
    return 'Today';
  }
}
