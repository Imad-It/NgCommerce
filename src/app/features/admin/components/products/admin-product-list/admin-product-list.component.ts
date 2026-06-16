import { Component, inject, input, output, signal } from '@angular/core';
import { ProductService } from '../../../../products/services/product.service';
import { CommonModule } from '@angular/common';
import { AdminProductRowComponent } from '../admin-product-row/admin-product-row.component';
import { Product } from '../../../../products/models/product.model';
import { LoadingService } from '../../../../../core/services/loading/loading.service';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule, AdminProductRowComponent, ConfirmDialogComponent],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css',
})
export class AdminProductListComponent {
  loadingService = inject(LoadingService);
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);
  private confirmDialogService = inject(ConfirmDialogService);
  products = input.required<Product[]>();
  reloadProducts = output<void>();

  selectedProductId = signal<number | null>(null);
  showModal = this.confirmDialogService.show;
  dialogData = this.confirmDialogService.data;

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
    this.confirmDialogService.open('Product', product.title);
  }

  //  Close modal
  closeDialog() {
    this.confirmDialogService.close();
    this.selectedProductId.set(null);
  }
}
