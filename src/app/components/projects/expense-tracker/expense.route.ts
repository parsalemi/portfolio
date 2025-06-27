import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'list',
        loadComponent: () => import('./expense-list/expense-list.component').then(c => c.ExpenseListComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
      },
      {
        path: 'login',
        loadComponent: () => import ('./login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
      },
      {
        path: 'expenses',
        loadComponent: () => import('./expenses/expenses.component').then(c => c.ExpensesComponent),
      },
      {
        path: 'add-income',
        loadComponent: () => import('./add-income/add-income.component').then(c => c.AddIncomeComponent),
      },
      {
        path: 'add-expense',
        loadComponent: () => import('./add-expense/add-expense.component').then(c => c.AddExpenseComponent),
      },
    ]
  }
]