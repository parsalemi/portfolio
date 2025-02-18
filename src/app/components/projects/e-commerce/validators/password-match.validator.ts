import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword');
  const repeatPassword = control.get('repeatNewPassword');
  const errors = { passwordShouldMatch: {mismatch: true }};

  if(password?.value === repeatPassword?.value){
    return null;
  }
  repeatPassword?.setErrors(errors);
  return errors;
} 