import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-empty',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.css',
})
export class CartEmptyComponent {
  faCartShopping = faCartShopping;
}
