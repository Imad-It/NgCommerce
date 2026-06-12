import { Component, computed, inject, input, output, signal } from '@angular/core';
import { AdminProductListComponent } from '../../../components/products/admin-product-list/admin-product-list.component';
import { Product } from '../../../../products/models/product.model';
import { ProductService } from '../../../../products/services/product.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductQuery } from '../../../../products/models/product-query.model';
import { finalize, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../../../core/services/loading/loading.service';

@Component({
  selector: 'app-admin-product-page',
  imports: [CommonModule, FormsModule, AdminProductListComponent, FaIconComponent, RouterLink],
  templateUrl: './admin-product-page.component.html',
  styleUrl: './admin-product-page.component.css',
})
export class AdminProductPageComponent {
  faPlus = faPlus;
  private loadingService = inject(LoadingService);

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  paramSignal = toSignal(this.route.queryParamMap);
  limit = signal(8);
  currentPage = signal(1);
  offset = computed(() => (this.currentPage() - 1) * this.limit());
  query = computed<ProductQuery>(() => {
    const params = this.paramSignal();

    return {
      offset: this.offset(),
      limit: this.limit(),
      categorySlug: params?.get('categorySlug') ?? undefined,
      title: params?.get('title') ?? undefined,
      price_min: params?.get('price_min') ? Number(params.get('price_min')) : undefined,
      price_max: params?.get('price_max') ? Number(params.get('price_max')) : undefined,
    };
  });

  products = toSignal(
    toObservable(this.query).pipe(
      switchMap((query: ProductQuery) =>
        this.productService
          .getProducts(query)
          .pipe(finalize(() => this.loadingService.setLoading(false))),
      ),
    ),
    { initialValue: [] as Product[] },
  );

  isLastPage = computed(() => {
    const data = this.products();
    return data.length < this.limit();
  });

  onLimitChange(newLimit: number) {
    this.limit.set(Number(newLimit));
    this.currentPage.set(1);
  }

  nextPage() {
    this.currentPage.update((p) => p + 1);
  }

  previousPage() {
    this.currentPage.update((p) => (p > 1 ? p - 1 : p));
  }
}
