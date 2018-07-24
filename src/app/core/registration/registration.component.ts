import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';


import { RegistrationValidator } from './registrationvalidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  Users: Array<string> = [];
  show: Boolean = false;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private router: Router) {
    this.registrationFormGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(9), Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      passwordFormGroup: this.passwordFormGroup
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
  }

  ngOnInit() {
  }
  showPassword() {
    this.show = !this.show;
  }



  onClickRegister() {
    this.Users.push(this.registrationFormGroup.value);
    this.registrationFormGroup.reset();
    this.passwordFormGroup.reset();
    localStorage.setItem('user', JSON.stringify(this.Users));
  }

}
