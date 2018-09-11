import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'artists', data: {artist: true, type: 'artists'}, component: MusicDashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'new-releases', data: {releases: true, type: 'releases'}, component: MusicDashboardComponent},
      {path: 'playlists', data: {playlist: true, type: 'playlists'}, component: MusicDashboardComponent},
      {path: 'playlists/:id', component: MusicDashboardComponent, data: {playlistItem: true, type: 'playlists'}},
      {path: 'playlists/tracks/:id', component: MusicDashboardComponent, data: {trackItem: true, type: 'tracks'}},
      {path: 'playlists/playlists/tracks/:id', component: MusicDashboardComponent, data: {trackItem: true, type: 'tracks'}},
      {path: 'favorites', component: FavoritesComponent},
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
