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
  loginRequestModel = signal({ email: '', password: '' });
  readonly formUtils = formUtils;

  loginRequestForm = form(this.loginRequestModel, (schema) => {
    required(schema.email, { message: 'Name is required.' });
    email(schema.email, { message: 'Please enter a valid email address.' });
    required(schema.password, { message: 'Name is required.' });
  });

  login() {
    const credential = {
      email: this.loginRequestForm.email().value(),
      password: this.loginRequestForm.password().value(),
    };
    console.log('#######', credential);
    this.authService.login(credential);
  }
}
