import { Component, computed, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../features/cart/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private cartService = inject(CartService);

  faCartShopping = faCartShopping;
  cartCount = computed(() =>
    this.cartService.cartItems().reduce((sum, item) => sum + item.quantity, 0),
  );
}
