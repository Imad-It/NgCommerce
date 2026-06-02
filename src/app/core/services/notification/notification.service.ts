import { Injectable, signal } from '@angular/core';
import { initialToast, ToastData } from '../../../shared/models/toast-data.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toastState = signal<ToastData>(initialToast);

  showSuccess(title: string, message: string) {
    this.toastState.set({
      visible: true,
      title,
      message,
      type: 'success',
    });
  }

  showError(title: string, message: string) {
    this.toastState.set({
      visible: true,
      title,
      message,
      type: 'error',
    });
  }

  hideToast() {
    this.toastState.set({
      visible: false,
      title: '',
      message: '',
      type: 'success',
    });
  }
}
