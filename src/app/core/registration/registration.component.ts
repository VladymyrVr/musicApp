import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegistrationValidator } from './registrationvalidator';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  show: Boolean = false;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    this.registrationFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
  }

  ngOnInit() {
  }
  showPassword() {
    this.show = !this.show;
  }

  onClickRegister() {

  }

}
