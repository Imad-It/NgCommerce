import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarCompoent } from './core/layout/sidebar/sidebar.compoent';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoadingService } from './core/services/loading.service';
import { ProductFilterComponent } from './features/products/product-filter/product-filter.component';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarCompoent,
    SpinnerComponent,
    ProductFilterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NgCommerce');
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
