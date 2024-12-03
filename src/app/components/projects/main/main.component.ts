import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    RouterOutlet,
  ],
})
export class MainComponent {
  private _router = inject(Router)
  sudoku(){
    this._router.navigate(['projects/sudoku']).then();
  }
}
