import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TagModule } from 'primeng/tag';

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
  projects: Project[] = [
    {
      title: 'Weather App',
      description: 'Weather status of any city using visual crossing weather API',
      img: 'weather',
      techsSvg: ['angular', 'sass', 'tailwind', 'rxjs'],
      link: 'weather',
      ownProject: true,
    },
    {
      title: 'Sudoku',
      description: 'Sudoku game (In progress)',
      img: 'sudoku',
      techsSvg: ['angular', 'tailwind'],
      link: 'sudoku',
      ownProject: true,
    },
    {
      title: 'Word guess',
      description: 'Word guess game (5 letters) that shows the correct letter in correct position (green), corrent letter in wrong postition (yellow) and wrong letter (red)',
      img: 'wordGuess',
      techsSvg: ['html', 'css', 'js'],
      link: 'wordGuess',
      ownProject: true,
    },
    {
      title: 'OMP Finex',
      description: 'A cryptocurrency exchange',
      img: 'ompfinex',
      techsSvg: ['angular', 'rxjs', 'tailwind', 'svelte'],
      link: 'https://ompfinex.com',
      ownProject: false,
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
}