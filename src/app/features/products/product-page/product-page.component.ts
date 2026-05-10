import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {
  productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  paramSignal = toSignal(this.route.queryParamMap);
  limit = signal(8);
  currentPage = signal(1);
  offset = computed(() => (this.currentPage() - 1) * this.limit());
  query = computed(() => {
    const params = this.paramSignal();
    return {
      offset: this.offset(),
      limit: this.limit(),
      categorySlug: params?.get('categorySlug') ?? undefined,
    };
  });

  products = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) =>
        this.productService.getProducts(query.offset, query.limit, query.categorySlug),
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
