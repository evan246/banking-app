export type EmotionType = 'happy' | 'stressful' | 'regret' | 'neutral';

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  vendor: string;
  description: string;
  date: Date;
  emotion?: EmotionType;
  time: string;
}
