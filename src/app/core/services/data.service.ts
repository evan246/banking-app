import { Injectable } from '@angular/core';
import { Account } from '../../shared/models/account.model';
import { Transaction, EmotionType } from '../../shared/models/transaction.model';
import { SavingsGoal } from '../../shared/models/savings-goal.model';
import { MicroHabit, Badge, CoachStats } from '../../shared/models/habit.model';
import { MoneyPrediction, Alert } from '../../shared/models/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private accounts: Account[] = [
    {
      id: '1',
      name: 'Main Checking',
      type: 'checking',
      balance: 245000,
      currency: '₦',
      accountNumber: '0123456789',
      lastUpdated: new Date()
    },
    {
      id: '2',
      name: 'Emergency Savings',
      type: 'savings',
      balance: 580000,
      currency: '₦',
      accountNumber: '9876543210',
      lastUpdated: new Date()
    },
    {
      id: '3',
      name: 'Investment Portfolio',
      type: 'investment',
      balance: 1200000,
      currency: '₦',
      accountNumber: '5555555555',
      lastUpdated: new Date()
    }
  ];

  private transactions: Transaction[] = [
    { id: '1', accountId: '1', amount: 5000, type: 'debit', category: 'Food', vendor: 'KFC', description: 'Lunch', date: new Date(2025, 10, 20, 13, 30), emotion: 'happy', time: '13:30' },
    { id: '2', accountId: '1', amount: 15000, type: 'debit', category: 'Transport', vendor: 'Uber', description: 'Ride to office', date: new Date(2025, 10, 20, 8, 15), emotion: 'neutral', time: '08:15' },
    { id: '3', accountId: '1', amount: 25000, type: 'debit', category: 'Shopping', vendor: 'Jumia', description: 'Impulse buy', date: new Date(2025, 10, 19, 23, 45), emotion: 'regret', time: '23:45' },
    { id: '4', accountId: '1', amount: 50000, type: 'credit', category: 'Salary', vendor: 'Company Inc', description: 'Monthly salary', date: new Date(2025, 10, 1, 9, 0), emotion: 'happy', time: '09:00' },
    { id: '5', accountId: '1', amount: 8000, type: 'debit', category: 'Entertainment', vendor: 'Netflix', description: 'Subscription', date: new Date(2025, 10, 18, 14, 20), emotion: 'happy', time: '14:20' },
    { id: '6', accountId: '2', amount: 20000, type: 'credit', category: 'Transfer', vendor: 'Self', description: 'Savings transfer', date: new Date(2025, 10, 15, 10, 0), emotion: 'neutral', time: '10:00' },
    { id: '7', accountId: '1', amount: 12000, type: 'debit', category: 'Bills', vendor: 'PHCN', description: 'Electricity bill', date: new Date(2025, 10, 17, 16, 30), emotion: 'stressful', time: '16:30' },
    { id: '8', accountId: '1', amount: 7500, type: 'debit', category: 'Transport', vendor: 'Bolt', description: 'Emergency ride', date: new Date(2025, 10, 16, 22, 0), emotion: 'stressful', time: '22:00' },
  ];

  private savingsGoals: SavingsGoal[] = [
    {
      id: '1',
      name: 'Dubai Vacation',
      targetAmount: 500000,
      currentAmount: 150000,
      deadline: new Date(2026, 5, 1),
      category: 'travel',
      aiSuggestion: {
        dailyAmount: 1800,
        weeklyAmount: 12600,
        monthlyAmount: 54000,
        adjustmentReason: 'Based on your spending patterns, saving ₦1,800/day is achievable'
      },
      progress: 30,
      createdAt: new Date(2025, 8, 1)
    },
    {
      id: '2',
      name: 'Masters Degree',
      targetAmount: 2000000,
      currentAmount: 450000,
      deadline: new Date(2026, 8, 1),
      category: 'education',
      aiSuggestion: {
        dailyAmount: 5200,
        weeklyAmount: 36400,
        monthlyAmount: 156000,
        adjustmentReason: 'Adjusted down by 15% due to recent increase in transport expenses'
      },
      progress: 22.5,
      createdAt: new Date(2025, 6, 15)
    }
  ];

  private microHabits: MicroHabit[] = [
    {
      id: '1',
      title: 'Save ₦200 today',
      description: 'Transfer just ₦200 to your savings account',
      date: new Date(),
      completed: false,
      points: 10,
      type: 'save'
    },
    {
      id: '2',
      title: 'No impulse buy for 24hrs',
      description: 'Resist buying anything unplanned today',
      date: new Date(),
      completed: false,
      points: 20,
      type: 'avoid'
    },
    {
      id: '3',
      title: 'Review yesterday\'s spending',
      description: 'Take 2 minutes to check where your money went',
      date: new Date(),
      completed: true,
      points: 15,
      type: 'track'
    }
  ];

  private badges: Badge[] = [
    { id: '1', name: 'First Step', description: 'Completed your first micro-habit', icon: '🎯', earned: true, earnedDate: new Date(2025, 10, 10) },
    { id: '2', name: 'Saver', description: 'Saved for 7 consecutive days', icon: '💰', earned: true, earnedDate: new Date(2025, 10, 15) },
    { id: '3', name: 'Streak Master', description: 'Maintained a 30-day streak', icon: '🔥', earned: false },
    { id: '4', name: 'Goal Crusher', description: 'Completed your first savings goal', icon: '🏆', earned: false },
  ];

  private predictions: MoneyPrediction[] = [
    { category: 'Transport', predictedAmount: 25000, confidence: 85, daysUntil: 7, date: new Date(2025, 10, 28), recurring: true },
    { category: 'Food', predictedAmount: 35000, confidence: 78, daysUntil: 15, date: new Date(2025, 11, 6), recurring: true },
    { category: 'Bills', predictedAmount: 18000, confidence: 92, daysUntil: 5, date: new Date(2025, 10, 26), recurring: true },
    { category: 'Entertainment', predictedAmount: 8000, confidence: 70, daysUntil: 12, date: new Date(2025, 11, 3), recurring: true },
  ];

  private alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      category: 'Transport',
      message: 'Your transport spending is 15% higher this week',
      percentage: 15,
      date: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'info',
      category: 'Savings',
      message: 'You\'re on track to reach your Dubai goal!',
      percentage: 0,
      date: new Date(2025, 10, 19),
      read: false
    }
  ];

  getAccounts(): Account[] {
    return this.accounts;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionsByEmotion(emotion: EmotionType): Transaction[] {
    return this.transactions.filter(t => t.emotion === emotion);
  }

  getSavingsGoals(): SavingsGoal[] {
    return this.savingsGoals;
  }

  getMicroHabits(): MicroHabit[] {
    return this.microHabits;
  }

  completeHabit(habitId: string): void {
    const habit = this.microHabits.find(h => h.id === habitId);
    if (habit) {
      habit.completed = true;
    }
  }

  getBadges(): Badge[] {
    return this.badges;
  }

  getCoachStats(): CoachStats {
    const completedHabits = this.microHabits.filter(h => h.completed);
    const totalPoints = completedHabits.reduce((sum, h) => sum + h.points, 0);
    return {
      totalPoints,
      streak: 12,
      level: Math.floor(totalPoints / 100) + 1,
      badges: this.badges
    };
  }

  getPredictions(): MoneyPrediction[] {
    return this.predictions;
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  markAlertAsRead(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.read = true;
    }
  }

  getTotalBalance(): number {
    return this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }
}
