import { Component, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [FaIconComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input<Product>();

  faCartShopping = faCartShopping;
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
