import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ProductService } from '../../../../products/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { AdminProductRowComponent } from '../admin-product-row/admin-product-row.component';
import { Product } from '../../../../products/models/product.model';
@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule, AdminProductRowComponent],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css',
})
export class AdminProductListComponent {
  products = input.required<Product[]>();
  // reloadProducts = output<void>();
}
