export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  user_id: string;
  account_id?: string;
  transaction_type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description?: string;
  reference_number: string;
  recipient_account?: string;
  created_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  account_number: string;
  account_type: 'checking' | 'savings' | 'business';
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  created_at: string;
}

export interface Report {
  id: string;
  title: string;
  report_type: 'daily' | 'weekly' | 'monthly' | 'custom';
  generated_by: string;
  data: any;
  created_at: string;
}
