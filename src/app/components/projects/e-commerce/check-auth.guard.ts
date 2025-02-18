import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(token){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    const expired: boolean = (Math.floor((new Date).getTime() / 1000)) >= expiry;
    if(expired == true){
      router.navigate(['/projects/e-commerce/login']);
      return false;
    }
  }
  return true;
};
