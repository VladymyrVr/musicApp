import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { TopTracksComponent } from './top-tracks/top-tracks.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'artists', component: MusicDashboardComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'new-releases', component: NewReleasesComponent },
      { path: 'top-tracks', component: TopTracksComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
