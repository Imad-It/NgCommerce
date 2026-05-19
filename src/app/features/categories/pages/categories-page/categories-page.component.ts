import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../services/category.service';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'app-categories-page',
  imports: [CategoryListComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent {
  categoryService = inject(CategoryService);

  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  });
}
