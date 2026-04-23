import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-items',
  imports: [CartItemComponent],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
})
export class CartItemsComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
