import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'artists', pathMatch: 'full' },
      { path: 'artists', component: MusicDashboardComponent },
      { path: 'new-releases', component: NewReleasesComponent },
      { path: 'top-tra', component: NewReleasesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
