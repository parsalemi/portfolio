import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Expense } from '../models/expense.model';
import { MatIconModule } from '@angular/material/icon';
import { CalendarModule } from 'primeng/calendar';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
  imports: [
    FormsModule,
    MatIconModule,
    CalendarModule,
    ReactiveFormsModule
  ],
})
export class AddExpenseComponent {
  constructor(private fb: FormBuilder) {}
  private _ctgService = inject(CategoryService);
  private _expenseService = inject(ExpensesService);
  categories = computed(() => this._ctgService.categories());
  selectedDate = '';

  newExpense: Expense = {
    subject: '',
    amount: 0,
    description: '',
    date: '',
    mode: 'expense',
    category: {
      id: 1,
      name: 'Home',
      icon: 'home',
      isDefault: true
    }
  }
  addExpense(){
    this._expenseService.saveExpense(this.newExpense);
    this.newExpense = {
      subject: '',
      amount: 0,
      description: '',
      date: '',
      mode: 'expense',
      category: {
        id: 1,
        name: 'Home',
        icon: 'home',
        isDefault: true
      }
    }
  }
  handleCategory(category: Category){
    this.newExpense.category = category;
  }
  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    this.newExpense.date = `${day}-${month}-${year}`;   
  }
  isFormValid(): boolean {
    return (this.newExpense.amount > 0 &&
    this.newExpense.subject.trim() !== '' &&
    this.newExpense.date !== '')
  }
}
