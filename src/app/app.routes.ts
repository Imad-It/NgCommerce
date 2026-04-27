import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart-page/cart-page.component').then((m) => m.CartPageComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/category-list/category-list.component').then(
        (m) => m.CategoryListComponent,
      ),
  },
];
