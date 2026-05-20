import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../features/admin/layout/admin-sidebar/admin-sidebar.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { LoadingService } from '../../core/services/loading.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { ProductFilterComponent } from '../../features/products/components/product-filter/product-filter.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SpinnerComponent, AdminSidebarComponent, ProductFilterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  loadingService = inject(LoadingService);
  private router = inject(Router);

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  showFilter = computed(() => this.currentUrl().startsWith('/products'));
}
