import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';


export interface IValidation {
  validator: ValidatorFn;
  message: (fieldName?: string) => string;
}

@Injectable()
export class FormValidationService {

  private lang = localStorage.getItem('lang');

  get required(): IValidation {
    return {
      validator: Validators.required,
      message: (fieldName?: string) => {
        return fieldName ? fieldName + ' is required.' : 'This information is required.'
      }
    }
  }

  get minLength5(): IValidation {
    return {
      validator: Validators.minLength(5),
      message: () => {
        return 'Please enter at least 5 letters.';
      }
    };
  }

  get emailPattern(): IValidation {
    return {
      validator: Validators
        .pattern(/^(([a-z0-9](\.|-|_){0,1})*)[a-z0-9]+@(([a-z0-9](\.|-|_){0,1})*)[a-z0-9]\.([a-z0-9](\.|-|_){0,1})+$/),
      message: () => {
        return 'Please Enter a valid email'
      }
    };
  }

  get onlyText(): IValidation {
    return {
      validator: Validators.pattern(/^(\u0626|\u0621|\u0622|[\u0627-\u06cc]|[a-zA-Z]|\s)*$/),
      message: () => {
        return 'Please enter only letters';
      }
    };
  }

  get phoneNumber(): IValidation {
    return {
      validator: Validators.pattern(/^[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/) || Validators.pattern(/^93[0-9]{9}$/),
      message: () => {
        return 'Please enter a valid phone number';
      }
    };
  }

  get integer(): IValidation {
    return {
      validator: Validators.pattern(/^[0-9]+$/),
      message: () => {
        return 'Please Enter only numbers';
      }
    };
  }

  get properText(): IValidation {
    return {
      validator: (control: AbstractControl) => {
        return /^\s+$/.test(control.value) ? {properText: true} : null;
      },
      message: (fieldName?: string) => {
        return fieldName ? fieldName + ' is required.' : 'This information is required.'
      }
    };
  }

  isValid(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  getValidNumber(n): number {
    if (!n) {
      return 0;
    } else if (isNaN(n)) {
      return 0;
    } else if (n < 1) {
      return 0;
    } else {
      return n;
    }
  }

  getValidNumberSigned(n): number {
    if (!n) {
      return 0;
    } else if (isNaN(n)) {
      return 0;
    } else {
      return n;
    }
  }

  isValidNumber (n: any) {
    return !isNaN(n);
  }

  isValidUnsignedNumber (n: any) {
    return !isNaN(n) && +n >= 0;
  }

}
