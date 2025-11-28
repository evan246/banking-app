import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MicroHabit, Badge, CoachStats } from '../../shared/models/habit.model';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ButtonComponent],
  animations: [
    trigger('checkAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">AI Financial Coach</h1>
        <p class="text-gray-600 mt-1">Build better money habits, one day at a time</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <app-card>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
              <span class="text-2xl font-bold text-white">{{ coachStats.level }}</span>
            </div>
            <p class="text-sm text-gray-600">Level</p>
          </div>
        </app-card>

        <app-card>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
              <span class="text-3xl">⭐</span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ coachStats.totalPoints }}</p>
            <p class="text-sm text-gray-600">Total Points</p>
          </div>
        </app-card>

        <app-card>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <span class="text-3xl">🔥</span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ coachStats.streak }}</p>
            <p class="text-sm text-gray-600">Day Streak</p>
          </div>
        </app-card>

        <app-card>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <span class="text-3xl">🏆</span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ getEarnedBadgesCount() }}</p>
            <p class="text-sm text-gray-600">Badges</p>
          </div>
        </app-card>
      </div>

      <app-card [elevated]="true">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Today's Micro-Habits</h2>
          <app-badge variant="primary">{{ getTodayDate() }}</app-badge>
        </div>

        <div class="space-y-4">
          <div *ngFor="let habit of habits" class="p-4 border-2 rounded-xl transition-all" [class.border-gray-200]="!habit.completed" [class.bg-gray-50]="!habit.completed" [class.border-green-500]="habit.completed" [class.bg-green-50]="habit.completed">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 mt-1">
                <button
                  (click)="toggleHabit(habit)"
                  class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all"
                  [class.border-gray-300]="!habit.completed"
                  [class.border-green-500]="habit.completed"
                  [class.bg-green-500]="habit.completed"
                  [disabled]="habit.completed"
                >
                  <svg *ngIf="habit.completed" @checkAnimation class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>

              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-semibold" [class.text-gray-900]="!habit.completed" [class.text-green-900]="habit.completed">
                    {{ habit.title }}
                  </h3>
                  <app-badge [variant]="getHabitTypeBadge(habit.type)" size="sm">
                    {{ habit.type }}
                  </app-badge>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ habit.description }}</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-primary">+{{ habit.points }} points</span>
                  <span *ngIf="habit.completed" class="text-xs font-medium text-green-600">✓ Completed!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 gradient-primary rounded-xl text-white">
          <div class="flex items-center gap-3">
            <span class="text-3xl">💡</span>
            <div>
              <p class="font-semibold">Daily Tip</p>
              <p class="text-sm text-red-100 mt-1">
                Small actions lead to big results. Complete all habits today to maintain your streak!
              </p>
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Your Badges</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div *ngFor="let badge of badges" class="p-4 text-center rounded-xl border-2 transition-all" [class.border-gray-200]="!badge.earned" [class.bg-gray-50]="!badge.earned" [class.border-primary]="badge.earned" [class.bg-primary]="badge.earned" [class.bg-opacity-5]="badge.earned">
            <div class="text-5xl mb-3" [class.opacity-30]="!badge.earned">{{ badge.icon }}</div>
            <h3 class="font-bold mb-1" [class.text-gray-500]="!badge.earned" [class.text-gray-900]="badge.earned">
              {{ badge.name }}
            </h3>
            <p class="text-xs" [class.text-gray-400]="!badge.earned" [class.text-gray-600]="badge.earned">
              {{ badge.description }}
            </p>
            <p *ngIf="badge.earned && badge.earnedDate" class="text-xs text-primary font-medium mt-2">
              Earned {{ formatDate(badge.earnedDate) }}
            </p>
          </div>
        </div>
      </app-card>

      <app-card>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Progress Timeline</h2>
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div class="space-y-6">
            <div *ngFor="let milestone of milestones" class="relative flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center relative z-10">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="flex-1 pb-6">
                <p class="font-semibold text-gray-900">{{ milestone.title }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ milestone.description }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ milestone.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class CoachComponent implements OnInit {
  habits: MicroHabit[] = [];
  badges: Badge[] = [];
  coachStats: CoachStats = {
    totalPoints: 0,
    streak: 0,
    level: 1,
    badges: []
  };

  milestones = [
    { title: 'First Habit Completed', description: 'Started your financial wellness journey', date: 'Nov 10, 2025' },
    { title: '7-Day Streak', description: 'Maintained consistency for a full week', date: 'Nov 15, 2025' },
    { title: 'Saved ₦5,000', description: 'Through micro-saving habits', date: 'Nov 18, 2025' },
    { title: 'Level 2 Achieved', description: 'Earned 100 total points', date: 'Nov 20, 2025' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.habits = this.dataService.getMicroHabits();
    this.badges = this.dataService.getBadges();
    this.coachStats = this.dataService.getCoachStats();
  }

  toggleHabit(habit: MicroHabit) {
    if (!habit.completed) {
      this.dataService.completeHabit(habit.id);
      habit.completed = true;
      this.coachStats.totalPoints += habit.points;
    }
  }

  getHabitTypeBadge(type: string): 'success' | 'warning' | 'info' | 'primary' {
    switch(type) {
      case 'save': return 'success';
      case 'avoid': return 'warning';
      case 'track': return 'info';
      case 'learn': return 'primary';
      default: return 'primary';
    }
  }

  getEarnedBadgesCount(): number {
    return this.badges.filter(b => b.earned).length;
  }

  getTodayDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
