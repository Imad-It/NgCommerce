import { Component, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../../../categories/services/category.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../../../shared/models/confirm-dialog-data.model';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../categories/models/category.model';

@Component({
  selector: 'app-admin-category-card',
  imports: [FaIconComponent, ConfirmDialogComponent, CommonModule],
  templateUrl: './admin-category-card.component.html',
  styleUrl: './admin-category-card.component.css',
})
export class AdminCategoryCardComponent {
  faTrash = faTrash;
  faEdit = faEdit;

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
  onDeleteCategory() {
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
  openDeleteDialog(id: number) {
    this.selectedCategoryId.set(id);

    this.dialogData.set({
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category?',
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
