import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopTracksComponent } from './top-tracks/top-tracks.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule
  ],
  declarations: [HomeComponent, MusicDashboardComponent, TopTracksComponent, NewReleasesComponent, DashboardComponent],
})

export class HomeModule {
}
