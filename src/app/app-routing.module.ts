import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../app/components/home-page/home-page.component').then(c => c.HomePageComponent),
  },
  {
    path: 'projects',
    loadChildren: () => import('./components/projects/projects.route').then( c => c.routes),
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(c => c.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./components/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
