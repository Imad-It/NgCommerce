import { Component, inject, input } from '@angular/core';
import { Product } from '../models/product.model';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [FaIconComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  private cartService = inject(CartService);

  faCartShopping = faCartShopping;
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
