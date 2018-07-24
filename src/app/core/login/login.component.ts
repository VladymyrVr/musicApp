import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  show: Boolean = false;
  loginFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, public snackBar: MatSnackBar) {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  showPassword() {
    this.show = !this.show;
  }
  handleLogin() {
    const userCheck = JSON.parse(localStorage.getItem('user')).find((item) => {
      return (item.email === this.loginFormGroup.value.email);
    });
    if (userCheck) {
      this.router.navigate(['']);
    } else {
     this.openSnackBar('Email or password is incorrect', 'Try again');
    }
  }
}
