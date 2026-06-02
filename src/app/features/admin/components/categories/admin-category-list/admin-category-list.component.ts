import { Component, inject, input, output, signal } from '@angular/core';
import { CategoryService } from '../../../../categories/services/category.service';
import { Category } from '../../../../categories/models/category.model';
import { ConfirmDialogData } from '../../../../../shared/models/confirm-dialog-data.model';
import { AdminCategoryCardComponent } from '../admin-category-card/admin-category-card.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-admin-category-list',
  imports: [CommonModule, AdminCategoryCardComponent, ConfirmDialogComponent],
  templateUrl: './admin-category-list.component.html',
  styleUrl: './admin-category-list.component.css',
})
export class AdminCategoryListComponent {
  reloadCategoreis = output<void>();
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);
  categories = input.required<Category[]>();
  selectedCategoryId = signal<number | null>(null);
  showModal = signal(false);
  dialogData = signal<ConfirmDialogData>({
    title: '',
    message: '',
    confirmButtonText: '',
  });

  deleteCategory() {
    const id = this.selectedCategoryId();

    if (!id) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.reloadCategoreis.emit();
        this.closeDialog();
        this.notificationService.showSuccess('Deleted', 'Category deleted successfully.');
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.notificationService.showError('Error', 'Operation failed. Please try again.');
      },
    });
  }

  //  Open modal
  openDeleteDialog(category: Category) {
    this.selectedCategoryId.set(category.id);

    this.dialogData.set({
      title: 'Delete Category',
      message: `Are you sure you want to delete the category <b class="text-danger">${category.name}</b>?`,
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

    this.selectedCategoryId.set(null);
  }
}
