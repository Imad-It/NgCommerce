import { Component, inject, input, output, signal } from '@angular/core';
import { CategoryService } from '../../../../categories/services/category.service';
import { Category } from '../../../../categories/models/category.model';
import { AdminCategoryRowComponent } from '../admin-category-row/admin-category-row.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-admin-category-list',
  imports: [CommonModule, AdminCategoryRowComponent, ConfirmDialogComponent],
  templateUrl: './admin-category-list.component.html',
  styleUrl: './admin-category-list.component.css',
})
export class AdminCategoryListComponent {
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);
  private confirmDialogService = inject(ConfirmDialogService);
  categories = input.required<Category[]>();
  reloadCategoreis = output<void>();
  selectedCategoryId = signal<number | null>(null);
  showModal = this.confirmDialogService.show;
  dialogData = this.confirmDialogService.data;

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
    this.confirmDialogService.open('Category', category.name);
  }

  //  Close modal
  closeDialog() {
    this.confirmDialogService.close();
    this.selectedCategoryId.set(null);
  }
}
