import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi, HttpClientModule, withInterceptors } from '@angular/common/http';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';
import { RouterLinkActive } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ButtonModule } from 'primeng/button';
import { HeaderOptionsComponent } from "./shared/layout/header-options/header-options.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'primeng/tooltip';
import { tokenInterceptor } from './components/projects/e-commerce/token.interceptor';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha-2';
import { environment } from 'src/environments/environment';

@NgModule({ 
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLinkActive,
    BrowserAnimationsModule,
    ButtonModule,
    HeaderOptionsComponent,
    HttpClientModule,
    TooltipModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AngularSvgIconModule.forRoot(),
  ], 
  providers: [
    provideHttpClient(withInterceptorsFromDi()), 
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.sitekey
      } as RecaptchaSettings
    }
  ],
})
export class AppModule { 
  constructor(){
    defineElement(lottie.loadAnimation)
  }
}
