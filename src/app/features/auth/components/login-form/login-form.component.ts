import { Component, inject, signal } from '@angular/core';
import { email, form, required, FormField } from '@angular/forms/signals';
import { AuthService } from '../../../../core/auth/services/auth.service';
import * as formUtils from '../../../../shared/utils/form.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormField],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  readonly formUtils = formUtils;
  loginFormModel = signal({ email: '', password: '' });

  loginForm = form(this.loginFormModel, (schema) => {
    required(schema.email, { message: 'Name is required.' });
    email(schema.email, { message: 'Please enter a valid email address.' });
    required(schema.password, { message: 'Name is required.' });
  });

  login() {
    if (this.loginForm().invalid()) {
      return;
    }
    const credentials = {
      email: this.loginForm.email().value(),
      password: this.loginForm.password().value(),
    };

    this.authService.login(credentials).subscribe({
      next: () => console.log('login Successful'),
      error: (error) => console.error('Login failed.', error),
    });
  }
}
