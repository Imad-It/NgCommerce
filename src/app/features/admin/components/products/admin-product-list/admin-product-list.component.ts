import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ProductService } from '../../../../products/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { AdminProductRowComponent } from '../admin-product-row/admin-product-row.component';
import { Product } from '../../../../products/models/product.model';
import { LoadingService } from '../../../../../core/services/loading/loading.service';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../../../shared/models/confirm-dialog-data.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule, AdminProductRowComponent, ConfirmDialogComponent],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css',
})
export class AdminProductListComponent {
  products = input.required<Product[]>();
  loadingService = inject(LoadingService);
  private notificationService = inject(NotificationService);
  reloadProducts = output<void>();
  private productService = inject(ProductService);
  selectedProductId = signal<number | null>(null);
  showModal = signal(false);
  dialogData = signal<ConfirmDialogData>({
    title: '',
    message: '',
    confirmButtonText: '',
  });

  deleteProduct() {
    const id = this.selectedProductId();

    if (!id) return;

    this.productService.deleteProducts(id).subscribe({
      next: () => {
        this.reloadProducts.emit();
        this.closeDialog();
        this.notificationService.showSuccess('Deleted', 'Product deleted successfully.');
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.notificationService.showError('Error', 'Operation failed. Please try again.');
      },
    });
  }

  //  Open modal
  openDeleteDialog(product: Product) {
    this.selectedProductId.set(product.id);

    this.dialogData.set({
      title: 'Delete Product',
      message: `Are you sure you want to delete the product <b class="text-danger">${product.title}</b>?`,
      confirmButtonText: 'Delete',
    });

    this.showModal.set(true);
  }

  //  Close modal
  closeDialog() {
    this.showModal.set(false);

    this.dialogData.set({
      title: '',
      message: '',
      confirmButtonText: '',
    });

    this.selectedProductId.set(null);
  }
}
