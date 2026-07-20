import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/shop-layout/shop-layout.component').then((m) => m.ShopLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
      },
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
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/admin/pages/categories/admin-category-page/admin-category-page.component').then(
            (m) => m.AdminCategoryPageComponent,
          ),
      },
      {
        path: 'categories/new',
        loadComponent: () =>
          import('./features/admin/pages/categories/admin-category-form-page/admin-category-form-page.component').then(
            (m) => m.AdminCategoryFormPageComponent,
          ),
      },
      {
        path: 'categories/:id/edit',
        loadComponent: () =>
          import('./features/admin/pages/categories/admin-category-form-page/admin-category-form-page.component').then(
            (m) => m.AdminCategoryFormPageComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/admin/pages/products/admin-product-page/admin-product-page.component').then(
            (m) => m.AdminProductPageComponent,
          ),
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./features/admin/pages/products/admin-product-form-page/admin-product-form-page.component').then(
            (m) => m.AdminProductFormPageComponent,
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/admin/pages/products/admin-product-details-page/admin-product-details-page.component').then(
            (m) => m.AdminProductDetailsPageComponent,
          ),
      },
      {
        path: 'products/:id/edit',
        loadComponent: () =>
          import('./features/admin/pages/products/admin-product-form-page/admin-product-form-page.component').then(
            (m) => m.AdminProductFormPageComponent,
          ),
      },
    ],
  },
];
