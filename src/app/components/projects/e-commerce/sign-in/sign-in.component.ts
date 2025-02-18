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
    NgIf
  ],
})
export class SignInComponent implements OnDestroy{
  constructor(private message: MessageService, private fb: FormBuilder){}
  togglePassword: boolean = false;
  env = environment;
  private _api = inject(UsersService)
  router = inject(Router)
  sub!: Subscription;

  signInUser = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  signIn(){
    const body: UserLogin = {
      username: this.signInUser.value.username as string,
      password: this.signInUser.value.password as string,
    }
    this.sub = this._api.signInUser(this.signInUser.value as UserLogin).subscribe({
      next: (res: User) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          this.router.navigate(['projects/e-commerce/products']);
        }
      },
      error: () => {
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
