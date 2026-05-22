import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../../categories/services/category.service';
import { Category } from '../../../../categories/models/category.model';
import { ConfirmDialogData } from '../../../../../shared/models/confirm-dialog-data.model';
import { AdminCategoryCardComponent } from '../admin-category-card/admin-category-card.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-category-list',
  imports: [AdminCategoryCardComponent, ConfirmDialogComponent],
  templateUrl: './admin-category-list.component.html',
  styleUrl: './admin-category-list.component.css',
})
export class AdminCategoryListComponent {
  private categoryService = inject(CategoryService);
  categories = signal<Category[]>([]);
  selectedCategoryId = signal<number | null>(null);
  showModal = signal(false);
  dialogData = signal<ConfirmDialogData>({
    title: '',
    message: '',
    confirmButtonText: '',
  });
  constructor() {
    this.loadCategories();
  }
  // Load data
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => console.error(err),
    });
  }

  //  Delete
  deleteCategory() {
    const id = this.selectedCategoryId();

    if (!id) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories(); // refresh list
        this.closeDialog();
      },
      error: (err) => {
        console.error('Delete failed', err);
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
