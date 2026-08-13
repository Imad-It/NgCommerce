import { Component, computed, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faAddressCard,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCartShopping,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../features/cart/services/cart.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FaIconComponent, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private cartService = inject(CartService);
  authService = inject(AuthService);
  private readonly router = inject(Router);
  faCartShopping = faCartShopping;
  faUser = faUser;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faArrowRightToBracket = faArrowRightToBracket;
  faUserPlus = faUserPlus;
  faAddressCard = faAddressCard;
  showNavbar = signal(false);
  cartCount = computed(() =>
    this.cartService.cartItems().reduce((sum, item) => sum + item.quantity, 0),
  );

  toggleNavbar() {
    this.showNavbar.update((value) => !value);
  }

  goToProfile(): void {
    const currentUrl = this.router.url;

    const targetUrl = currentUrl.startsWith('/admin') ? '/admin/profile' : '/profile';

    this.router.navigateByUrl(targetUrl);
  }
}
