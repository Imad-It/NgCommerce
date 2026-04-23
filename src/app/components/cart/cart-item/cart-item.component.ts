import { Component, inject, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../../models/product.model';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [FaIconComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;

  cartItem = input.required<CartItem>();
  cartService = inject(CartService);

  removeFromCart(id: number) {
    this.cartService.cartItems.update((items) => items.filter((item) => item.product.id !== id));
  }

  increaseQuantity(cartItem: CartItem) {
    this.cartService.cartItems.update((items) =>
      items.map((item) =>
        item.product.id === cartItem.product.id
          ? { ...item, quantity: cartItem.quantity + 1 }
          : item,
      ),
    );
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      this.cartService.cartItems.update((items) =>
        items.map((item) =>
          item.product.id === cartItem.product.id
            ? { ...item, quantity: cartItem.quantity - 1 }
            : item,
        ),
      );
    }
  }
}
