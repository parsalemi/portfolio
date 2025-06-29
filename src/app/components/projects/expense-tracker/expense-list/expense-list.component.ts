import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
  imports: [],
})
export class ExpenseListComponent {
  private _router = inject(Router);

  addInExp(mode: string){
    this._router.navigate([`./projects/expense-tracker/add-${mode}`]);
  }

}
