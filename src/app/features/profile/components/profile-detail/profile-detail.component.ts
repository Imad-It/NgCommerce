import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  imports: [RouterLink],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css',
})
export class ProfileDetailComponent {
  readonly authService = inject(AuthService);
  readonly user = this.authService.currentUser();
  readonly isAdmin = this.authService.isAdmin();
}
