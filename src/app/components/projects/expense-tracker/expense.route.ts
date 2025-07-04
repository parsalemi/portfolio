import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'list',
        loadComponent: () => import('./expense-list/expense-list.component').then(c => c.ExpenseListComponent),
      },
      {
        path: 'add-income',
        loadComponent: () => import('./add-income/add-income.component').then(c => c.AddIncomeComponent),
      },
      {
        path: 'add-expense',
        loadComponent: () => import('./add-expense/add-expense.component').then(c => c.AddExpenseComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
      },
    ]
  }
]