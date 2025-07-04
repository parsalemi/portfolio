import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Income } from '../models/income.model';
import { IncomesService } from '../services/incomes.service';
import { Category } from '../models/category.model';
import { MatIconModule } from '@angular/material/icon';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-income',
  standalone: true,
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss',
  imports: [
    MatIconModule,
    FormsModule,
    CalendarModule
  ],
})
export class AddIncomeComponent {
  constructor(private fb: FormBuilder) {}
  private _ctgService = inject(CategoryService);
  private _incomeService = inject(IncomesService);
  categories = computed(() => this._ctgService.categories());
  selectedDate = '';

  newIncome: Income = {
    subject: '',
    amount: 0,
    date: '',
    mode: 'income',
    category: {
      id: 1,
      name: 'Home',
      icon: 'home',
      isDefault: true
    }
  }
  addIncome(){
    this._incomeService.saveIncome(this.newIncome);
    this.newIncome = {
      subject: '',
      amount: 0,
      date: '',
      mode: 'income',
      category: {
        id: 1,
        name: 'Home',
        icon: 'home',
        isDefault: true
      }
    }
  }
  handleCategory(category: Category){
    this.newIncome.category = category;
  }
  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    this.newIncome.date = `${day}-${month}-${year}`;   
  }
  isFormValid(): boolean {
    return (this.newIncome.amount > 0 &&
    this.newIncome.subject.trim() !== '' &&
    this.newIncome.date !== '')
  }
}
