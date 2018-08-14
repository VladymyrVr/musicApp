import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'artists', data: {artist: true}, component: MusicDashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'new-releases', data: {releases: true}, component: MusicDashboardComponent},
      {path: 'top-tracks', data: {topTrack: true}, component: MusicDashboardComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
