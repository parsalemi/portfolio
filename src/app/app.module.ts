import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';
import { RouterLinkActive } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ButtonModule } from 'primeng/button';
import { HeaderOptionsComponent } from "./shared/layout/header-options/header-options.component";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterLinkActive,
    BrowserAnimationsModule,
    ButtonModule,
    HeaderOptionsComponent
],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  constructor(){
    defineElement(lottie.loadAnimation)
  }
}
