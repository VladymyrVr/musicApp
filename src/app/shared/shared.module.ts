import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';


import { HeaderComponent } from './header/header.component';
import {SharedRoutingModule} from './shared-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpSpotifyService} from './services/http-spotify.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    RouterModule,
    HttpClientModule
  ],
  providers: [HttpSpotifyService],
  declarations: [HeaderComponent]
})
export class SharedModule { }
