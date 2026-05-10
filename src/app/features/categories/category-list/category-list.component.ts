import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categoryService = inject(CategoryService);
  router = inject(Router);
  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  });
}
