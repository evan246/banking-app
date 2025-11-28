export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  currency: string;
  accountNumber: string;
  lastUpdated: Date;
}
