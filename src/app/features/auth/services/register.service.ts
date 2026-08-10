import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }
}
