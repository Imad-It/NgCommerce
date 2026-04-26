import { effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../../products/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  constructor() {
    const stored = localStorage.getItem('CartItems');

    if (stored) {
      try {
        this.cartItems.set(JSON.parse(stored));
      } catch (e) {
        console.error('Fehler beim Parsen', e);
        this.cartItems.set([]);
      }
    }
    effect(() => localStorage.setItem('CartItems', JSON.stringify(this.cartItems())));
  }

  addToCart(product: Product) {
    this.cartItems.update((items) => {
      const index = items.findIndex((item) => item.product.id === product.id);

      if (index === -1) {
        return [...items, { product, quantity: 1 }];
      } else {
        return items.map((item, i) => {
          return i === index ? { ...item, quantity: item.quantity + 1 } : item;
        });
      }
    });
  }
}
