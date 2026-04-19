import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cartItems.update((items) => [...items, product]);
  }
}
