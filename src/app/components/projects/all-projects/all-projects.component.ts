import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-all-projects',
  standalone: true,
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  imports: [
    RouterLink,
    ButtonModule
  ],
})
export class AllProjectsComponent {

}
