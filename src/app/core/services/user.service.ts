import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private supabaseService: SupabaseService) {}

  getAllUsers(): Observable<User[]> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as User[];
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as User;
      })
    );
  }

  updateUser(id: string, updates: Partial<User>): Observable<User> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as User;
      })
    );
  }

  getUsersByRole(role: string): Observable<User[]> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .select('*')
        .eq('role', role)
        .order('created_at', { ascending: false })
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as User[];
      })
    );
  }
}
