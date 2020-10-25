import {Component, OnInit} from '@angular/core';
import {FormValidationService} from '../services/form-validation.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ILogin} from './login.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(public formValidationService: FormValidationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      password: [undefined, this.formValidationService.required.validator],
      username: [undefined, this.formValidationService.required.validator],
    });
  }

}
