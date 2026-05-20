import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/shop-layout/shop-layout.component').then((m) => m.ShopLayoutComponent),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/pages/products-page/products-page.component').then(
            (m) => m.ProductsPageComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/pages/cart-page/cart-page.component').then(
            (m) => m.CartPageComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/pages/categories-page/categories-page.component').then(
            (m) => m.CategoriesPageComponent,
          ),
      },
    ],
  },
  // {
  //   path: 'products',
  //   loadComponent: () =>
  //     import('./features/products/pages/products-page/products-page.component').then(
  //       (m) => m.ProductsPageComponent,
  //     ),
  // },
  // {
  //   path: 'cart',
  //   loadComponent: () =>
  //     import('./features/cart/pages/cart-page/cart-page.component').then(
  //       (m) => m.CartPageComponent,
  //     ),
  // },
  // {
  //   path: 'categories',
  //   loadComponent: () =>
  //     import('./features/categories/pages/categories-page/categories-page.component').then(
  //       (m) => m.CategoriesPageComponent,
  //     ),
  // },
];
