import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../../../features/auth/models/login-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../../../features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from '../../../features/auth/models/user.model';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';
  private readonly token = signal<string | null>(localStorage.getItem('token'));
  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => this.token() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  initializeAuth(): void {
    if (this.token()) {
      this.loadProfile().subscribe({
        error: () => {
          this.logout();
        },
      });
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
        this.token.set(response.access_token);
      }),
      switchMap(() => this.loadProfile()),
    );
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

  loadProfile(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/auth/profile`)
      .pipe(tap((user) => this.currentUser.set(user)));
  }
}
