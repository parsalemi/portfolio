import { Injectable, signal } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  localExpenses = localStorage.getItem('expenses');
  expenses = signal<Expense[]>(this.localExpenses ? JSON.parse(this.localExpenses) : []);

  saveExpense(expense: Expense) {
    this.expenses.update(expenses => [...expenses, expense]);
    localStorage.setItem('expenses', JSON.stringify(this.expenses()))
  }
  deleteExpense(expense: Expense){
    this.expenses.update(expenses => expenses.filter(exp => exp.amount !== expense.amount))
    localStorage.setItem('expenses', JSON.stringify(this.expenses()))
  }
}
