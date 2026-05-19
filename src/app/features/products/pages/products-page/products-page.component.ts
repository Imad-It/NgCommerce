import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductQuery } from '../../models/product-query.model';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  productService = inject(ProductService);
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
      switchMap((query: ProductQuery) => this.productService.getProducts(query)),
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
