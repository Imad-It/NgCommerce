import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../../../features/auth/models/login-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../../../features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from '../../../features/auth/models/user.model';
import { catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private router = inject(Router);
  private readonly baseUrl = environment.apiUrl;
  private readonly token = signal<string | null>(localStorage.getItem('token'));
  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => this.token() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  initializeAuth(): Observable<User | null> {
    if (!this.token()) {
      return of(null);
    }

    return this.loadProfile().pipe(
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
        this.token.set(response.access_token);
      }),
      switchMap(() => this.loadProfile()),
    );
  }

  loadProfile(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/auth/profile`)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  getToken(): string | null {
    return this.token();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
