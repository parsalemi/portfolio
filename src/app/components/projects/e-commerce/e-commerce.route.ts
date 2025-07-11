import { Routes } from "@angular/router";
import { checkAuthGuard } from "./check-auth.guard";
import { loginGuard } from "./login.guard";
import { MainComponent } from "../main/main.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'profile',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
      },
      {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('./sign-in/sign-in.component').then(c => c.SignInComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./sign-up/sign-up.component').then(c => c.SignUpComponent),
      },
      {
        path: 'products',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./products-list/products-list.component').then(c => c.ProductsListComponent),
      },
      {
        path: ':username/cart/:cartId',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent),
      },
      {
        path: ':username/order-history',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./order-history/order-history.component').then(c => c.OrderHistoryComponent),
      }
    ]
  }
]