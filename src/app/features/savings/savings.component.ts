import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SavingsGoal } from '../../shared/models/savings-goal.model';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CardComponent, BadgeComponent, ButtonComponent, ModalComponent],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Savings Goals</h1>
          <p class="text-gray-600 mt-1">AI-powered goal optimizer</p>
        </div>
        <app-button (click)="showAddGoalModal = true">
          + New Goal
        </app-button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-card *ngFor="let goal of goals" [elevated]="true">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-2xl">{{ getCategoryIcon(goal.category) }}</span>
                  <h3 class="text-xl font-bold text-gray-900">{{ goal.name }}</h3>
                </div>
                <app-badge [variant]="'info'" size="sm">{{ goal.category }}</app-badge>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-primary">{{ goal.progress }}%</p>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>₦{{ formatNumber(goal.currentAmount) }}</span>
                <span>₦{{ formatNumber(goal.targetAmount) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  class="h-3 rounded-full gradient-primary transition-all duration-500"
                  [style.width.%]="goal.progress"
                ></div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h4 class="font-semibold text-gray-900">AI Optimization</h4>
              </div>

              <div class="grid grid-cols-3 gap-3 mb-3">
                <div class="bg-primary bg-opacity-5 p-3 rounded-lg text-center">
                  <p class="text-xs text-gray-600 mb-1">Daily</p>
                  <p class="font-bold text-primary">₦{{ formatNumber(goal.aiSuggestion.dailyAmount) }}</p>
                </div>
                <div class="bg-primary bg-opacity-5 p-3 rounded-lg text-center">
                  <p class="text-xs text-gray-600 mb-1">Weekly</p>
                  <p class="font-bold text-primary">₦{{ formatNumber(goal.aiSuggestion.weeklyAmount) }}</p>
                </div>
                <div class="bg-primary bg-opacity-5 p-3 rounded-lg text-center">
                  <p class="text-xs text-gray-600 mb-1">Monthly</p>
                  <p class="font-bold text-primary">₦{{ formatNumber(goal.aiSuggestion.monthlyAmount) }}</p>
                </div>
              </div>

              <div class="p-3 bg-blue-50 rounded-lg">
                <p class="text-xs text-blue-800">
                  <strong>AI Insight:</strong> {{ goal.aiSuggestion.adjustmentReason }}
                </p>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">Target Date</span>
                <span class="font-medium text-gray-900">{{ formatDate(goal.deadline) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Days Remaining</span>
                <span class="font-medium text-gray-900">{{ getDaysRemaining(goal.deadline) }} days</span>
              </div>
            </div>

            <div class="flex gap-2">
              <app-button variant="primary" size="sm" [fullWidth]="true">
                Add Money
              </app-button>
              <app-button variant="outline" size="sm" [fullWidth]="true">
                Adjust Goal
              </app-button>
            </div>
          </div>
        </app-card>
      </div>

      <app-card>
        <h2 class="text-xl font-bold text-gray-900 mb-4">How AI Optimization Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span class="text-3xl">📊</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Analyze Patterns</h3>
            <p class="text-sm text-gray-600">
              We study your income and spending habits to understand your financial capacity
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span class="text-3xl">🎯</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
            <p class="text-sm text-gray-600">
              AI calculates realistic daily, weekly, and monthly savings amounts
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span class="text-3xl">🔄</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Auto-Adjust</h3>
            <p class="text-sm text-gray-600">
              Recommendations adapt automatically based on your spending changes
            </p>
          </div>
        </div>
      </app-card>

      <app-modal [(isOpen)]="showAddGoalModal" title="Create New Savings Goal">
        <form (ngSubmit)="createGoal()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
            <input
              type="text"
              [(ngModel)]="newGoal.name"
              name="name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Dubai Vacation"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              [(ngModel)]="newGoal.category"
              name="category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="housing">Housing</option>
              <option value="emergency">Emergency Fund</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Target Amount (₦)</label>
            <input
              type="number"
              [(ngModel)]="newGoal.targetAmount"
              name="targetAmount"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="500000"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              [(ngModel)]="newGoal.deadline"
              name="deadline"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <app-button type="submit" [fullWidth]="true">
              Create Goal
            </app-button>
            <app-button type="button" variant="outline" [fullWidth]="true" (click)="showAddGoalModal = false">
              Cancel
            </app-button>
          </div>
        </form>
      </app-modal>
    </div>
  `
})
export class SavingsComponent implements OnInit {
  goals: SavingsGoal[] = [];
  showAddGoalModal = false;
  newGoal: any = {
    name: '',
    category: 'travel',
    targetAmount: 0,
    deadline: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.goals = this.dataService.getSavingsGoals();
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getDaysRemaining(deadline: Date): number {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getCategoryIcon(category: string): string {
    switch(category) {
      case 'travel': return '✈️';
      case 'education': return '🎓';
      case 'housing': return '🏠';
      case 'emergency': return '🆘';
      default: return '🎯';
    }
  }

  createGoal() {
    this.showAddGoalModal = false;
    this.newGoal = { name: '', category: 'travel', targetAmount: 0, deadline: '' };
  }
}
