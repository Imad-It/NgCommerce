import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-empty',
  imports: [FaIconComponent],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.css',
})
export class CartEmptyComponent {
  faCartShopping = faCartShopping;
}
