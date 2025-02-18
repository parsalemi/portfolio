import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, Location, NgIf } from '@angular/common';
import { User, UserUpdate } from '../models/user.model';
import { FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { passwordMatch } from '../validators/password-match.validator';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    NgIf,
    AngularSvgIconModule,
  ],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit, OnDestroy{
  constructor(private message: MessageService, private fb: FormBuilder, private fbNotNull: NonNullableFormBuilder, private location: Location){}
  private _api = inject(UsersService);
  togglePassword: boolean = false;
  toggleNewPassword: boolean = false;
  env = environment;
  router = inject(Router)
  sub!: Subscription;
  user$!: Observable<User>;
  userId!: number;
  username!: string;
  age!: string;
  gender!: string;

  userInfo = this.fbNotNull.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[\w.]+$/)]],
    age: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]+$/)]],
    gender: ['', [Validators.required]],
    password: this.fbNotNull.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.minLength(8), 
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      repeatNewPassword: '' 
    }, {
      validators: [passwordMatch]
    }),
  });

  updateUserInfo(){
    this.sub = this._api.updateUser(this.userId, this.userInfo.value as UserUpdate).subscribe({
      next: () => {
        this.message.add({severity: 'success', summary: 'Attempt successfull', detail: 'Your profile updated', life: 3000})
        setTimeout(() => this.router.navigate(['projects/e-commerce/products']), 2000);
      },
      error: () => {
        this.message.add({severity: 'error', summary: 'Attempt failed', detail: 'wrong password', life: 3000})
      }
    });
  }
  deleteUser(){
    const confirmDelete: boolean = confirm('Are you sure?');
    if(confirmDelete && this.userInfo.controls.password.controls.currentPassword.valid){
      this._api.deleteUser(this.userId, this.userInfo.controls.password.controls.currentPassword.value).subscribe({
        next: () => {
          this.message.add({severity: 'info', summary: 'Deleted', detail: 'Account deleted successfully', life: 3000})
          setTimeout(() => this.router.navigate(['projects/e-commerce/register']) ,3000)
          localStorage.removeItem('token');
        },
        error: () => {
          this.message.add({severity: 'error', summary: 'An error occured', detail: 'Please try again', life: 2000})
        }
      });
    }
  }
  showPassword(){
    this.togglePassword = !this.togglePassword;
  }
  showNewPassword(){
    this.toggleNewPassword = !this.toggleNewPassword;
  }
  goBack(){
    this.location.back();
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      const userId = JSON.parse(atob(payload)).userId;
      this.user$ = this._api.getUserData(userId);
      this.user$.subscribe(res => {
        this.userId = userId;
        this.userInfo.patchValue({
          username: res.username,
          age: res.age,
          gender: res.gender
        })
      })
      this.userInfo.controls.password.controls.currentPassword.updateValueAndValidity();
      this.userInfo.controls.password.controls.currentPassword.markAsDirty();
    }
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }  
}