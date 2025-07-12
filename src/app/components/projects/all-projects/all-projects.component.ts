import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TagModule } from 'primeng/tag';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  imports: [
    RouterLink,
    CardModule,
    AngularSvgIconModule,
    TagModule,
],
})
export class AllProjectsComponent {
  env = environment;
  projects: Project[] = [
    {
      title: 'Weather App',
      description: 'Weather status of any city using visual crossing weather API',
      img: 'weather',
      techsSvg: ['angular', 'sass', 'tailwind', 'rxjs'],
      link: 'weather',
      ownProject: true,
      finished: true,
    },
    {
      title: 'Sudoku',
      description: 'Sudoku game (In progress)',
      img: 'sudoku',
      techsSvg: ['angular', 'tailwind'],
      link: 'sudoku',
      ownProject: true,
      finished: false,
    },
    {
      title: 'Word guess',
      description: 'Word guess game (5 letters)',
      img: 'wordguess',
      techsSvg: ['html', 'css', 'js'],
      link: 'wordGuess',
      ownProject: true,
      finished: true,
    },
    {
      title: 'OMP Finex',
      description: 'A cryptocurrency exchange',
      img: 'ompfinex',
      techsSvg: ['angular', 'rxjs', 'tailwind', 'svelte'],
      link: 'https://ompfinex.com',
      ownProject: false,
      finished: true,
    },
    {
      title: 'E-Commerce',
      description: 'A simple e-commerce with shopping cart',
      img: 'ecommerce',
      techsSvg: ['angular', 'rxjs', 'nodejs', 'postgresql', 'tailwind'],
      link: 'e-commerce',
      ownProject: true,
      finished: true,
    },
    {
      title: 'Expense Tracker',
      description: 'An expense tracker app. I put PWA app in my github that works both online and offline',
      img: 'expense-tracker',
      techsSvg: ['angular', 'sass', 'tailwind'],
      link: 'expense-tracker',
      ownProject: true,
      finished: false,
    }
  ]
  handleLink(el: HTMLAnchorElement, ownProject: boolean, link: string){
    if(ownProject){
      el.setAttribute('routerLink', '../'+link);
      el.setAttribute('router-link', '../'+link);
      // el.setAttribute('href', '../'+link);
    }else {
      el.setAttribute('href', link);
    }
  }
}
interface Project {
  title: string;
  description: string;
  img: string;
  techsSvg: string[];
  link: string;
  ownProject: boolean;
  finished: boolean;
}