import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Transaction, Account } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private supabaseService: SupabaseService) {}

  getTransactions(userId?: string): Observable<Transaction[]> {
    let query = this.supabaseService.client
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    return from(query).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Transaction[];
      })
    );
  }

  getTransactionById(id: string): Observable<Transaction> {
    return from(
      this.supabaseService.client
        .from('transactions')
        .select('*')
        .eq('id', id)
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Transaction;
      })
    );
  }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return from(
      this.supabaseService.client
        .from('transactions')
        .insert(transaction)
        .select()
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Transaction;
      })
    );
  }

  updateTransaction(id: string, updates: Partial<Transaction>): Observable<Transaction> {
    return from(
      this.supabaseService.client
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Transaction;
      })
    );
  }

  getAccounts(userId?: string): Observable<Account[]> {
    let query = this.supabaseService.client
      .from('accounts')
      .select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    return from(query).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Account[];
      })
    );
  }

  getAccountById(id: string): Observable<Account> {
    return from(
      this.supabaseService.client
        .from('accounts')
        .select('*')
        .eq('id', id)
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Account;
      })
    );
  }

  createAccount(account: Partial<Account>): Observable<Account> {
    return from(
      this.supabaseService.client
        .from('accounts')
        .insert(account)
        .select()
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Account;
      })
    );
  }
}
