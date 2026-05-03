import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from '../../../features/categories/services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './sidebar.compoent.html',
  styleUrl: './sidebar.compoent.css',
})
export class SidebarCompoent {
  categoryService = inject(CategoryService);
  categories = toSignal(
    this.categoryService.getCategories().pipe(map((categories) => categories.slice(0, 4))),
  );
}
