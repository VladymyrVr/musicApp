import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
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
  message: string = 'The registration was successfully.';
  actionButtonLabel: string = '';
  action: Boolean = true;
  setAutoHide: Boolean = true;
  autoHide: number = 2000;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private router: Router) {
    this.registrationFormGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(9), Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.formBuilder.group({
        password: [null, Validators.required],
        repeatPassword: [null, Validators.required]
      }, {
        validator: RegistrationValidator.validate.bind(this)
      })
    });
  }

  open() {
    const config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  ngOnInit() {
  }
  showPassword() {
    this.show = !this.show;
  }



  onClickRegister() {
    this.open();
    console.log(this.Users);
    this.Users.push(this.registrationFormGroup.value);
    this.registrationFormGroup.reset();
    localStorage.setItem('user', JSON.stringify(this.Users));
  }

}
