import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarCompoent } from './components/sidebar/sidebar.compoent';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { CartPageComponent } from './components/cart/cart-page/cart-page.component';

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
