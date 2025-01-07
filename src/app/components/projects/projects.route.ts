import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'allProjects',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'allProjects',
        loadComponent: () => import('./all-projects/all-projects.component').then(c => c.AllProjectsComponent),
        title: 'My Projects',
      },
      {
        path: 'sudoku',
        loadComponent: () => import('./sudoku/sudoku.component').then(c => c.SudokuComponent),
        title: 'Sudoku Game',
      },
      {
        path: 'wordGuess',
        loadComponent: () => import('./word-game/word-game.component').then( c => c.WordGameComponent),
        title: 'Word Guess Game',
      },
      {
        path: 'weather',
        loadComponent: () => import('./weather/all-weathers/all-weathers.component').then(c => c.AllWeathersComponent),
        title: 'Weather App',
      },
      {
        path: 'weatherDetail',
        loadComponent: () => import('./weather/weather-detail/weather-detail.component').then(c => c.WeatherDetailComponent),
      },
      {
        path: 'weather/:city',
        loadComponent: () => import('./weather/weather-detail/weather-detail.component').then(c => c.WeatherDetailComponent),
        title: 'City Details',
      },

    ]
  }
];