import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../../features/auth/models/login-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../../../features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
  }
}
