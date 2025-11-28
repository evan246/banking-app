export interface MoneyPrediction {
  category: string;
  predictedAmount: number;
  confidence: number;
  daysUntil: number;
  date: Date;
  recurring: boolean;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  category: string;
  message: string;
  percentage: number;
  date: Date;
  read: boolean;
}
