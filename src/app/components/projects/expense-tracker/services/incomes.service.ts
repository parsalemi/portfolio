import { Injectable, signal } from '@angular/core';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  constructor() { }
  localIncomes = localStorage.getItem('incomes');
  incomes = signal<Income[]>(this.localIncomes ? JSON.parse(this.localIncomes) : []);

  saveIncome(income: Income) {
    this.incomes.update(incomes => [...incomes, income]);
    localStorage.setItem('incomes', JSON.stringify(this.incomes()))
  }
  deleteIncome(income: Income){
    this.incomes.update(incomes => incomes.filter(inc => inc.amount !== income.amount))
    localStorage.setItem('incomes', JSON.stringify(this.incomes()))
  }
}
