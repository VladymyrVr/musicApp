import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  show: Boolean = false;
  loginFormGroup: FormGroup;

  message: string = 'Your password or email is incorrect';
  actionButtonLabel: string = 'Try again';
  action: Boolean = true;
  setAutoHide: Boolean = true;
  autoHide: number = 2000;

  constructor(private formBuilder: FormBuilder, private router: Router, public snackBar: MatSnackBar) {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  open() {
    const config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
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
     this.open();
    }
  }
}
