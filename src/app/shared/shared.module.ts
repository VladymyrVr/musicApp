import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';


import { HeaderComponent } from './header/header.component';
import {SharedRoutingModule} from './shared-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpotifyService} from './services/http-spotify.service';
import {HttpClientModule} from '@angular/common/http';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    MusicDashboardComponent,
    RouterModule,
    HttpClientModule
  ],
  providers: [SpotifyService],
  declarations: [HeaderComponent, MusicDashboardComponent]
})
export class SharedModule { }
