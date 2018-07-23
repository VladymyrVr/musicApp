import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [RouterModule,
            HeaderComponent
           ],
  declarations: [HeaderComponent, LoginComponent]
})
export class CoreModule { }
