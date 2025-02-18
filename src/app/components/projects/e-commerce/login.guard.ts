import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  localStorage.removeItem('token');
  return true;
};
