import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../../../features/auth/models/login-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../../../features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';
  private token = signal<string | null>(localStorage.getItem('token'));

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
        this.token.set(response.access_token);
      }),
    );
  }

  isAuthenticated() {
    return this.token() !== null;
  }

  getToken(): string | null {
    return this.token();
  }
}
