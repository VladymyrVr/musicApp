import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  show: Boolean = false;
  loginFormGroup: FormGroup;
  message = 'Your password or email is incorrect';
  actionButtonLabel = 'Try again';
  action = true;
  setAutoHide = true;
  autoHide = 2000;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public snackBar: MatSnackBar,
              private setLogged: AuthService) {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  showErorr() {
    const config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  showPassword() {
    this.show = !this.show;
  }

  checkUser() {
    const userCheck = JSON.parse(localStorage.getItem('user')).find((item) => {
      return (item.email === this.loginFormGroup.value.email && item.passwords.password === this.loginFormGroup.value.password);
    });
    if (userCheck) {
      this.setLogged.setItem('userLogged', 'true');
    }
    return userCheck;
  }

  handleLogin() {
    if (this.checkUser()) {
      this.router.navigate(['']);
    } else {
      this.showErorr();
    }
  }
}
