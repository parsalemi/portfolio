import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';
import { DOCUMENT } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{
  title = 'Parsalemi Portfolio';
  darkMode: boolean = !localStorage.getItem('theme') ? true : localStorage.getItem('theme') == 'dark' ? true : false;
  animatedBorder: boolean = true;
  settingsOpt: MenuItem[] | undefined;
  env = environment;
  userTheme: string | null = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
  userColor: string | null = localStorage.getItem('color') ? localStorage.getItem('color') : 'blue';
  
  constructor(
    @Inject(DOCUMENT) private _document: Document,
  ){
    defineElement(lottie.loadAnimation);
    localStorage.setItem('theme', this.userTheme as string);
    localStorage.setItem('color', this.userColor as string);
    this._document.documentElement.setAttribute('data-theme', this.userTheme as string);
    this._document.documentElement.setAttribute('data-color', this.userColor as string);
  }
  
  toggleDark(){
    this.darkMode = !this.darkMode;
    const dataTheme = this._document.documentElement.getAttribute('data-theme');
    if(dataTheme == 'dark'){
      this._document.documentElement.setAttribute('data-theme', 'light');
      document.querySelector('.fullPage')?.classList.add('dark')
      localStorage.setItem('theme', 'light')
    } else if(dataTheme == 'light'){
      this._document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark')
      document.querySelector('.fullPage')?.classList.remove('dark')
    }
  }

  togglePuple(){
    const dataColor = this._document.documentElement.getAttribute('data-color');
    if(dataColor !== 'purple'){
      this._document.documentElement.setAttribute('data-color', 'purple');
      localStorage.setItem('color', 'purple')
    }
  }

  toggleBlue(){
    const dataColor = this._document.documentElement.getAttribute('data-color');
    if(dataColor !== 'blue'){
      this._document.documentElement.setAttribute('data-color', 'blue');
      localStorage.setItem('color', 'blue')
    }
  }

  toggleGreen(){
    const dataColor = this._document.documentElement.getAttribute('data-color');
    if(dataColor !== 'green'){
      this._document.documentElement.setAttribute('data-color', 'green');
      localStorage.setItem('color', 'green')
    }
  }
  toggleAnimation(){
    const arr = [];
    const aboutEl = this._document.querySelector('.about');
    const projectsEl = this._document.querySelector('.projects');
    const skillsEl = this._document.querySelector('.skills');
    const contactEl = this._document.querySelector('.contact');
    const resumeEl = this._document.querySelector('.resume');
    
    arr.push(aboutEl, projectsEl, skillsEl, contactEl, resumeEl);

    arr.forEach( (el: any) => {
      if(el){
        this.animatedBorder = !this.animatedBorder;
        if(el.style.backgroundImage == 'none'){
          el.style.backgroundImage = 'conic-gradient(from var(--border-gradient-angle) at 50% 50%, transparent, var(--primary-700) 14%, transparent 17%)';
        }else {
          el.style.backgroundImage = 'none';
        }
      }
    })
  }
  ngOnInit(){
    // localStorage.setItem('theme', 'dark')
    // localStorage.setItem('color', 'blue')
    let isDark = localStorage.getItem('theme') == 'dark' ? true : false;
    document.querySelector('.fullPage')?.classList.add(isDark ? '' : 'dark');
  }
}
