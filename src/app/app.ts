import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarCompoent } from './core/layout/sidebar/sidebar.compoent';
import { CartPageComponent } from './features/cart/cart-page/cart-page.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarCompoent,
    ProductListComponent,
    CartPageComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NgCommerce');
}
