import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MusicDashboardComponent } from './music-dashboard/music-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoriteService } from './services/favorite.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule
  ],
  declarations: [HomeComponent, MusicDashboardComponent, DashboardComponent, FavoritesComponent],
  providers: [FavoriteService]
})

export class HomeModule {
}
