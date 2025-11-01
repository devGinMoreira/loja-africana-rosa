import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/auth/pages/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/pages/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/products/pages/product-detail.component').then(m => m.ProductDetailComponent)
      }
    ]
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/pages/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/checkout/pages/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/orders/pages/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/account/pages/account.component').then(m => m.AccountComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
