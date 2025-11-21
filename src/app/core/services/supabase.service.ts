import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<SupabaseUser | null>(null);
  public currentUser$: Observable<SupabaseUser | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.initAuthListener();
  }

  private initAuthListener(): void {
    this.supabase.auth.onAuthStateChange((event, session) => {
      (() => {
        if (session?.user) {
          this.currentUserSubject.next(session.user);
        } else {
          this.currentUserSubject.next(null);
        }
      })();
    });

    this.supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        this.currentUserSubject.next(session.user);
      }
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async signUp(email: string, password: string, fullName: string, role: string = 'customer') {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await this.supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email,
          full_name: fullName,
          role: role
        });

      if (profileError) throw profileError;
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }
}
