import { Component, input, output } from '@angular/core';
import { ConfirmDialogData } from '../../models/confirm-dialog-data.model';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  confirmData = input.required<ConfirmDialogData>();
  cancel = output<void>();
  confirm = output<void>();
  onCancel() {
    this.cancel.emit();
  }
  onConfirm() {
    this.confirm.emit();
  }
}
