import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import * as formUtils from '../../../../shared/utils/form.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormField],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private signalParam = toSignal(this.route.paramMap);
  id = computed(() => this.signalParam()?.get('id') ?? undefined);
  readonly formUtils = formUtils;
  private fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private readonly baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  loading = signal(false);
  uploading = signal(false);
  imageTouched = signal(false);
  registerModel = signal({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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

    this.uploadImage(file).subscribe({
      next: (res) => {
        const imageUrl = res.location || res.url;

        if (!imageUrl) return;

        this.registerForm.avatar().value.set(imageUrl);
      },

      error: (err) => {
        console.error(err);
        this.uploading.set(false);
      },

      complete: () => {
        this.uploading.set(false);
      },
    });
  }

  // REMOVE IMAGE
  removeImage() {
    this.registerForm.avatar().value.set('');
    this.fileInput()!.nativeElement.value = '';
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/files/upload`, formData);
  }
}
