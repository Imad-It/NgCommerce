import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ProductService } from '../../../../products/services/product.service';
import { Product } from '../../../../products/models/product.model';

@Component({
  selector: 'app-admin-product-details-page',
  imports: [RouterLink],
  templateUrl: './admin-product-details-page.component.html',
  styleUrl: './admin-product-details-page.component.css',
})
export class AdminProductDetailsPageComponent {
  product = signal<Product | null>(null);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe((porduct) => {
      this.product.set(porduct);
    });
  }
}
