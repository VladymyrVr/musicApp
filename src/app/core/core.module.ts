import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatSnackBarModule} from '@angular/material';
import {AuthGuard} from '../auth.guard';
import {AuthService} from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [AuthGuard, AuthService]
})
export class CoreModule { }
