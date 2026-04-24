import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  currentPage = signal(1);
  limit = signal(8);
  products = signal<Product[]>([]);
  isLastPage = signal(false);

  ngOnInit(): void {
    this.loadProducts();
  }

  getOffset(): number {
    return (this.currentPage() - 1) * this.limit();
  }

  loadProducts() {
    this.productService.getProducts(this.getOffset(), this.limit()).subscribe((data) => {
      this.products.set(data);
      if (data.length < this.limit()) {
        this.isLastPage.set(true);
      }
    });
  }
  onLimitChange(newLimit: number) {
    this.limit.set(Number(newLimit));
    this.currentPage.set(1);
    this.loadProducts();
  }

  nextPage() {
    this.currentPage.update((page) => page + 1);
    this.loadProducts();
  }

  previousPage() {
    this.currentPage.update((page) => (page > 1 ? page - 1 : page));
    this.loadProducts();
    if (this.isLastPage()) {
      this.isLastPage.set(false);
    }
  }
}
