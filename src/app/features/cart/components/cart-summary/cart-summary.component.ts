import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  imports: [],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent {
  cartService = inject(CartService);
  shipping: number = 10;
  tax: number = 0;

  total = computed(() =>
    this.cartService
      .cartItems()
      .reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0),
  );
}
