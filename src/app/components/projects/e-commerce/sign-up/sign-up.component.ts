import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User, UserRegister, UserRegisterDTO } from '../models/user.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'src/environments/environment';
import { passwordMatch } from '../validators/password-match.validator';
import { NgIf } from '@angular/common';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha-2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [MessageService],
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    ToastModule,
    AngularSvgIconModule,
    NgIf,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
})
export class SignUpComponent implements OnDestroy{
  constructor(private message: MessageService, private fb: FormBuilder, private fbNotNull: NonNullableFormBuilder){}
  private _api = inject(UsersService);
  togglePass: boolean = false;
  env = environment
  router = inject(Router)
  sub!: Subscription;
  loading: boolean = false;
  
  newUser = this.fbNotNull.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[\w.]+$/)]],
    age: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]+$/)]],
    gender: ['male', Validators.required],
    password: this.fbNotNull.group({
      newPassword: ['', [
        Validators.required, Validators.minLength(8), 
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]
      ],
      repeatNewPassword: '',
    },{
      validators: [passwordMatch]
    }),
    recaptcha: [null, [Validators.required]],
  });

  register(){
    this.loading = true;
    this.sub = this._api.registerUser(this.newUser.value as UserRegister).subscribe({
      next: (res: User) => {
        this.loading = false;
        this.message.add({severity: 'success', summary: 'Registered', detail: 'Enjoy shopping', life: 3000})
        if(res.token){
          localStorage.setItem('token', res.token)
          setTimeout(() => this.router.navigate(['projects/e-commerce/products']), 1000)
        }
      },
      error: () => {
        this.loading = false;
        this.message.add({severity: 'error', summary: 'Attempt failed', detail: 'Please try again', life: 3000})
      }
    })
  }
  showPassword(){
    this.togglePass = !this.togglePass;
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
