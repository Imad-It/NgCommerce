import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categoryService = inject(CategoryService);
  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  });
}
