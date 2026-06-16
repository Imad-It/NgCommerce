import { Injectable, signal } from '@angular/core';
import { ConfirmDialogData, initialDialogData } from '../models/confirm-dialog-data.model';

type EntityType = 'Product' | 'Category';
@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  show = signal<boolean>(false);
  data = signal<ConfirmDialogData>(initialDialogData);

  open(entity: EntityType, displayName: string) {
    this.data.set({
      title: `Delete ${entity}`,
      message: `Are you sure you want to delete the ${entity.toLowerCase()} <b class="text-danger">${displayName}</b>?`,
      confirmButtonText: 'Delete',
    });

    this.show.set(true);
  }
  close() {
    this.show.set(false);
    this.data.set(initialDialogData);
  }
}
