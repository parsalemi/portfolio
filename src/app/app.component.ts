import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';
import { DOCUMENT } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{
  title = 'Parsalemi Portfolio';
  darkMode: boolean = true;
  settingsOpt: MenuItem[] | undefined;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private _platformId: string,
  ){
    defineElement(lottie.loadAnimation);
    this._document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  toggleDark(){
    this.darkMode = !this.darkMode;
    const dataTheme = this._document.documentElement.getAttribute('data-theme');
    console.log(dataTheme);
    if(dataTheme == 'dark'){
      this._document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.toggle('dark');
    } else if(dataTheme == 'light'){
      this._document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.toggle('dark')
    }
    console.log(this.darkMode);
    document.querySelector('.fullPage')?.classList.toggle('dark')
  }
  ngOnInit(){
    this.settingsOpt = [
      {
        label: 'Options',
        items: [
          {
            label: 'Dark/Light',
            icon: 'pi pi-moon',
            command: () => this.toggleDark,
          }
        ]
      }
    ]
  }
}
