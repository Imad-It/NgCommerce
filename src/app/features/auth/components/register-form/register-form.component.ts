import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import * as formUtils from '../../../../shared/utils/form.util';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user.model';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormField],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly registerService = inject(RegisterService);
  private readonly loadingService = inject(LoadingService);
  private readonly notificationService = inject(NotificationService);
  private signalParam = toSignal(this.route.paramMap);
  id = computed(() => this.signalParam()?.get('id') ?? undefined);
  readonly formUtils = formUtils;
  private fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  loading = signal(false);
  uploading = signal(false);
  imageTouched = signal(false);
  registerModel = signal<
    User & {
      passwordConfirmation: string;
    }
  >({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'customer',
    avatar: '',
  });

  registerForm = form(this.registerModel, (schema) => {
    required(schema.name, { message: 'Name is required' });
    minLength(schema.name, 4, { message: 'Must be at least 4 characters' });
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Please enter a valid email address.' });
    required(schema.password, { message: 'Password is required' });
    required(schema.passwordConfirmation, { message: 'Password confirmation is required' });
    required(schema.avatar, { message: 'Avatar is required' });

    validate(schema.passwordConfirmation, ({ value, valueOf }) => {
      const passwordConfirmation = value();
      const password = valueOf(schema.password);

      if (passwordConfirmation && password && passwordConfirmation !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'The passwords do not match.',
        };
      }

      return null;
    });
  });

  // IMAGE SELECT
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // preview locally
    const reader = new FileReader();
    reader.onload = () => {
      this.registerForm.avatar().value.set(reader.result as string);
    };
    reader.readAsDataURL(file);

    this.uploading.set(true);

    this.registerService.uploadImage(file).subscribe({
      next: (res) => {
        const imageUrl = res.location || res.url;

        if (!imageUrl) return;

        this.registerForm.avatar().value.set(imageUrl);
      },

      error: (err) => {
        console.error(err);
        this.uploading.set(false);
        this.notificationService.showError('Error', 'Error uploading images');
      },

      complete: () => {
        this.uploading.set(false);
      },
    });
  }

  register(): void {
    if (this.registerForm().invalid()) {
      return;
    }

    const { passwordConfirmation, ...user } = this.registerModel();

    this.loadingService.setLoading(true);

    this.registerService
      .register(user)
      .pipe(finalize(() => this.loadingService.setLoading(false)))
      .subscribe({
        next: () => {
          this.resetForm();
          this.notificationService.showSuccess('Success', 'User is registered');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);

          this.notificationService.showError('Error', 'Error registering user');
        },
      });
  }

  // REMOVE IMAGE
  removeImage() {
    this.registerForm.avatar().value.set('');
    this.fileInput()!.nativeElement.value = '';
  }

  // RESET FORM
  private resetForm(): void {
    this.fileInput()!.nativeElement.value = '';
    this.registerModel.set({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      role: 'customer',
      avatar: '',
    });
  }
}
