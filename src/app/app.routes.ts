import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-page/product-page.component').then(
        (m) => m.ProductPageComponent,
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
      import('./features/categories/pages/categories-page/categories-page.component').then(
        (m) => m.CategoriesPageComponent,
      ),
  },
];
