import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  currentPage = signal(1);
  limit = signal(8);
  paramSignal = toSignal(this.route.queryParamMap);
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
