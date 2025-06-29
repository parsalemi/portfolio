import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
  animations: [
    trigger('menuAnimation', [
      state('void', style({
        opacity: 1,
        left: '-70%'
      })),
      state('visible', style({
        opacity: 1,
        left: '0%'
      })),
      transition('void => visible', [
        animate('300ms ease-in')
      ]),
      transition('visible => void', [
        animate('300ms ease-in')
      ])
    ])
  ],
  imports: [
    RouterLink,
    RouterLinkActive
  ],
})
export class NavMenuComponent {
  menuState: 'void' | 'visible' = 'void';
  elRef = inject(ElementRef);
  router = inject(Router);

  constructor(){
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(
      () => this.menuState = 'void'
    )
  }

  toggleMenu(){
    this.menuState = this.menuState === 'void' ? 'visible' : 'void';
  }

  @HostListener('document:click', ['$event']) clickout(event: Event) {
    if(!this.elRef.nativeElement.contains(event.target)) {
      this.menuState = 'void';
    }
  }
}
