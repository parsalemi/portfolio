import { Component, ElementRef, HostListener, inject, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

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
export class NavMenuComponent implements OnDestroy{
  menuState: 'void' | 'visible' = 'void';
  elRef = inject(ElementRef);
  router = inject(Router);
  private _destroy$ = new Subject<void>();

  constructor(){
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(
      () => this.menuState = 'void'
    );
  }

  toggleMenu(){
    this.menuState = this.menuState === 'void' ? 'visible' : 'void';
  }

  @HostListener('document:click', ['$event']) clickout(event: Event) {
    if(!this.elRef.nativeElement.contains(event.target)) {
      this.menuState = 'void';
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
