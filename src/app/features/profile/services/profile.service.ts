import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  getProfile() {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      throw new Error('No authenticated user found.');
    }
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
}
