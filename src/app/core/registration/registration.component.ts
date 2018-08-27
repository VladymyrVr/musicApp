import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

import {RegistrationValidator} from './registrationvalidator';
import { LocalstorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  Users: Array<string> = [];
  show = false;
  registrationFormGroup: FormGroup;
  message = 'The registration was successfully.';
  actionButtonLabel = '';
  action = true;
  setAutoHide = true;
  autoHide = 2000;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private storage: LocalstorageService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm () {
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

  showPassword() {
    this.show = !this.show;
  }

  onClickRegister() {
    this.open();
    this.Users.push(this.registrationFormGroup.value);
    this.registrationFormGroup.reset();
    this.storage.set('user', this.Users);
  }
}
