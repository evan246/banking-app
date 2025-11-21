import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, throwError, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { User, UserRole } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      const user = await this.supabaseService.getCurrentUser();
      if (user) {
        const profile = await this.supabaseService.getUserProfile(user.id);
        if (profile) {
          this.currentUserSubject.next(profile as User);
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  login(email: string, password: string): Observable<User> {
    this.loadingSubject.next(true);
    return from(this.supabaseService.signIn(email, password)).pipe(
      switchMap(authData => {
        if (!authData.user) {
          throw new Error('Authentication failed');
        }
        return from(this.supabaseService.getUserProfile(authData.user.id));
      }),
      tap(profile => {
        if (profile) {
          this.currentUserSubject.next(profile as User);
        }
        this.loadingSubject.next(false);
      }),
      map(profile => profile as User),
      catchError(error => {
        this.loadingSubject.next(false);
        // Local dev fallback: allow demo accounts when Supabase isn't configured
        if (!environment.production) {
          const demoAccounts: { email: string; password: string; role: UserRole; full_name: string }[] = [
            { email: 'admin@bank.com', password: 'admin123', role: 'admin', full_name: 'Amaka Okoro' },
            { email: 'manager@bank.com', password: 'manager123', role: 'manager', full_name: 'Somy Nwafor' },
            { email: 'customer@bank.com', password: 'customer123', role: 'customer', full_name: 'Amanda Eze' },
            { email: 'support@bank.com', password: 'support123', role: 'support', full_name: 'Kamsi Obi' }
          ];

          const match = demoAccounts.find(a => a.email === email && a.password === password);
          if (match) {
            const mockUser: User = {
              id: `${match.role}-local-1`,
              email: match.email,
              full_name: match.full_name,
              role: match.role,
              phone: '',
              avatar_url: '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            this.currentUserSubject.next(mockUser);
            return of(mockUser);
          }
        }

        return throwError(() => error);
      })
    );
  }

  register(email: string, password: string, fullName: string, role: UserRole = 'customer'): Observable<any> {
    this.loadingSubject.next(true);
    return from(this.supabaseService.signUp(email, password, fullName, role)).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    return from(this.supabaseService.signOut()).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Logout error:', error);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.currentUserValue;
    return user !== null && roles.includes(user.role);
  }

  get userRole(): UserRole | null {
    return this.currentUserValue?.role || null;
  }
}
