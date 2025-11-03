import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User, UserLogin, UserDTO } from '../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'src/environments/environment';
import { NgIf } from '@angular/common';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha-2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [MessageService],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    AngularSvgIconModule,
    NgIf,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
})
export class SignInComponent implements OnDestroy{
  constructor(private message: MessageService, private fb: FormBuilder){}
  togglePassword: boolean = false;
  env = environment;
  private _api = inject(UsersService)
  router = inject(Router)
  sub!: Subscription;
  loading: boolean = false;

  signInUser = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    recaptcha: [null, [Validators.required]]
  });

  signIn(){
    this.loading = true;
    this.sub = this._api.signInUser(this.signInUser.value as UserLogin).subscribe({
      next: (res: User) => {
        this.loading = false;
        if(res.token){
          localStorage.setItem('token', res.token);
          this.router.navigate(['projects/e-commerce/products']);
        }
      },
      error: () => {
        this.loading = false;
        this.message.add({severity: 'error', summary: 'Attempt failed', detail: 'Please try again', life: 3000})
      }
    });
  }
  showPassword(){
    this.togglePassword = !this.togglePassword
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
