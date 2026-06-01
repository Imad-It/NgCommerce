import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../../categories/services/category.service';
import { ConfirmDialogData } from '../../../../../shared/models/confirm-dialog-data.model';
import { Category } from '../../../../categories/models/category.model';
import { AdminCategoryListComponent } from '../../../components/categories/admin-category-list/admin-category-list.component';
import { RouterLink } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-category-page',
  imports: [AdminCategoryListComponent, RouterLink, FaIconComponent],
  templateUrl: './admin-category-page.component.html',
  styleUrl: './admin-category-page.component.css',
})
export class AdminCategoryPageComponent {
  faPlus = faPlus;
  categories = signal<Category[]>([]);
  private categoryService = inject(CategoryService);
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
}
