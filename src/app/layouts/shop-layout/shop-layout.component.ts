import { Component, computed, inject } from '@angular/core';
import { ProductFilterComponent } from '../../features/products/components/product-filter/product-filter.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SidebarComponent } from '../../core/layout/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-shop-layout',
  imports: [RouterOutlet, SidebarComponent, SpinnerComponent, ProductFilterComponent],
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.css',
})
export class ShopLayoutComponent {
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
