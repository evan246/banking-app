export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'travel' | 'education' | 'housing' | 'emergency' | 'other';
  aiSuggestion: {
    dailyAmount: number;
    weeklyAmount: number;
    monthlyAmount: number;
    adjustmentReason?: string;
  };
  progress: number;
  createdAt: Date;
}
