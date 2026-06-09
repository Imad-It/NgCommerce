import { Component, inject, input, output } from '@angular/core';
import { AdminProductListComponent } from '../../../components/products/admin-product-list/admin-product-list.component';
import { Product } from '../../../../products/models/product.model';
import { ProductService } from '../../../../products/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-product-page',
  imports: [AdminProductListComponent, FaIconComponent, RouterLink],
  templateUrl: './admin-product-page.component.html',
  styleUrl: './admin-product-page.component.css',
})
export class AdminProductPageComponent {
  faPlus = faPlus;
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
