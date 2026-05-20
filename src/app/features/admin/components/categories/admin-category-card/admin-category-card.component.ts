import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../../../categories/services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-category-card',
  imports: [FaIconComponent],
  templateUrl: './admin-category-card.component.html',
  styleUrl: './admin-category-card.component.css',
})
export class AdminCategoryCardComponent {
  categoryService = inject(CategoryService);
  faTrash = faTrash;
  faEdit = faEdit;
  categories = toSignal(this.categoryService.getCategories());
}
