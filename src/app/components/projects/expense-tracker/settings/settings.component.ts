import { Component } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    CategoriesComponent
  ],
})
export class SettingsComponent {

}
