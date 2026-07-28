import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../../../features/auth/models/login-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../../../features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from '../../../features/auth/models/user.model';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';
  private token = signal<string | null>(localStorage.getItem('token'));
  private currentUser = signal<User | null>(null);

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
        this.token.set(response.access_token);
      }),
      switchMap(() => this.loadProfil()),
    );
  }

  isAuthenticated(): boolean {
    return this.token() !== null;
  }

  getToken(): string | null {
    return this.token();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
    this.currentUser.set(null);
  }

  loadProfil(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`).pipe(
      tap((user) => {
        return this.currentUser.set(user);
      }),
    );
  }
}
