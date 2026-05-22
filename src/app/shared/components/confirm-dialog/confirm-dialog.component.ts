import { Component, input, output } from '@angular/core';
import { ConfirmDialogData } from '../../models/confirm-dialog-data.model';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  modalData = input.required<ConfirmDialogData>();

  cnacelled = output<void>();

  confirmed = output<void>();

  closeModal() {
    this.cnacelled.emit();
  }

  confirmAction() {
    this.confirmed.emit();
  }
}
