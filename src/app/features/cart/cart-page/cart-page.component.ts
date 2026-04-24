import { Component, computed, inject, OnInit } from '@angular/core';
import { CartItemsComponent } from '../components/cart-items/cart-items.component';

import { CommonModule } from '@angular/common';
import { CartEmptyComponent } from '../components/cart-empty/cart-empty.component';
import { CartSummaryComponent } from '../components/cart-summary/cart-summary.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, CartItemsComponent, CartSummaryComponent, CartEmptyComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartService = inject(CartService);
  isEmpty = computed(() => this.cartService.cartItems().length === 0);
}
