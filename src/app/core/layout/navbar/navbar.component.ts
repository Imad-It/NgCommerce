import { Component, computed, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../features/cart/services/cart.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FaIconComponent, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private cartService = inject(CartService);
  faCartShopping = faCartShopping;
  faUser = faUser;
  showNavbar = signal(false);
  cartCount = computed(() =>
    this.cartService.cartItems().reduce((sum, item) => sum + item.quantity, 0),
  );

  toggleNavbar() {
    this.showNavbar.update((value) => !value);
  }
}
