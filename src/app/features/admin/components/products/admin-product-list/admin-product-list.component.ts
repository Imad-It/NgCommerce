import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ProductService } from '../../../../products/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { AdminProductRowComponent } from '../admin-product-row/admin-product-row.component';
@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule, AdminProductRowComponent],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css',
})
export class AdminProductListComponent {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts());
}
