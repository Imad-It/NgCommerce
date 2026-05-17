import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from '../../../features/categories/services/category.service';
import { map } from 'rxjs/operators';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCubes, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterModule, FaIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  router = inject(Router);
  showSidebar = signal(false);
  faLayerGroup = faLayerGroup;
  faCubes = faCubes;
  queryParams = toSignal(this.route.queryParamMap);

  categories = toSignal(
    this.categoryService.getCategories().pipe(map((categories) => categories.slice(0, 4))),
  );
  toggleSidebar() {
    this.showSidebar.update((value) => !value);
  }
}
