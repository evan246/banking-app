import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Alert } from '../../../shared/models/prediction.model';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-ash">
      <header class="gradient-primary text-white py-6 px-4 md:px-8 shadow-lg">
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold">SmartPurse AI</h1>
              <p class="text-red-100 mt-1">Your Financial Command Center</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="relative">
                <button class="relative p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span *ngIf="unreadAlerts > 0" class="absolute -top-1 -right-1 bg-yellow-400 text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {{ unreadAlerts }}
                  </span>
                </button>
              </div>
              <button routerLink="/settings" class="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 md:px-8">
          <div class="flex space-x-8 overflow-x-auto py-4">
            <a routerLink="/dashboard" routerLinkActive="text-primary border-b-2 border-primary" [routerLinkActiveOptions]="{exact: true}" class="whitespace-nowrap font-medium text-gray-600 hover:text-primary transition-colors pb-1">
              Dashboard
            </a>
            <a routerLink="/accounts" routerLinkActive="text-primary border-b-2 border-primary" class="whitespace-nowrap font-medium text-gray-600 hover:text-primary transition-colors pb-1">
              Accounts
            </a>
            <a routerLink="/transactions" routerLinkActive="text-primary border-b-2 border-primary" class="whitespace-nowrap font-medium text-gray-600 hover:text-primary transition-colors pb-1">
              Transactions
            </a>
            <a routerLink="/savings" routerLinkActive="text-primary border-b-2 border-primary" class="whitespace-nowrap font-medium text-gray-600 hover:text-primary transition-colors pb-1">
              Savings
            </a>
            <a routerLink="/coach" routerLinkActive="text-primary border-b-2 border-primary" class="whitespace-nowrap font-medium text-gray-600 hover:text-primary transition-colors pb-1">
              AI Coach
            </a>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppShellComponent implements OnInit {
  unreadAlerts = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const alerts = this.dataService.getAlerts();
    this.unreadAlerts = alerts.filter(a => !a.read).length;
  }
}
