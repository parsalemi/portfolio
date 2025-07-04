import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/expense.model';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Income } from '../models/income.model';
import { IncomesService } from '../services/incomes.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
  providers : [MessageService],
  imports: [
    MatIconModule,
    CurrencyPipe,
    ToastModule,
    NgClass
  ],
})
export class ExpenseListComponent {
  constructor(private _message: MessageService){}
  private _router = inject(Router);
  private _ctgsService = inject(CategoryService);
  private _expenseService = inject(ExpensesService);
  private _incomeService = inject(IncomesService);

  expenses: Signal<Expense[]> = computed(() => this._expenseService.expenses());
  incomes: Signal<Income[]> = computed(() => this._incomeService.incomes());

  allData = computed(() => [...this.expenses(), ...this.incomes()])
  categories = this._ctgsService.categories();


  addInExp(mode: string){
    this._router.navigate([`./projects/expense-tracker/add-${mode}`]);
  }
  deleteExpense(exp: Expense){
    this._expenseService.deleteExpense(exp)
  }
  deleteIncome(inc: Income){
    this._incomeService.deleteIncome(inc)
  }
  editExpense(){
    this._message.add({severity: 'error', summary: 'This option is not available in this demo', detail: 'Install the app from my github (link in home page)', life: 4000})
  }

}
