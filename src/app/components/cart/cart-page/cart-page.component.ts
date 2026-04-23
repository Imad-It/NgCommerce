import { Component, computed, inject, OnInit } from '@angular/core';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { CartService } from '../../../services/cart/cart.service';

import { CommonModule } from '@angular/common';
import { CartEmptyComponent } from '../cart-empty/cart-empty.component';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, CartItemsComponent, CartSummaryComponent, CartEmptyComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartService = inject(CartService);
  isEmpty = computed(() => this.cartService.cartItems().length === 0);

  ngOnInit(): void {
    console.log('Init läuft');

    const storedItems = localStorage.getItem('CartItems');
    console.log('Stored:', storedItems);

    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      console.log('Parsed:', parsedItems);

      this.cartService.cartItems.set(parsedItems);
    }
  }
}
