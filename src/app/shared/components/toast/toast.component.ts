import { Component, effect, inject, input } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  notificationService = inject(NotificationService);

  autoHideEffect = effect(() => {
    if (this.notificationService.toastState().visible) {
      setTimeout(() => {
        this.notificationService.hideToast();
      }, 5000);
    }
  });
}
