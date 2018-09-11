import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotifyService } from './services/http-spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { MusicCardComponent } from './music-card/music-card.component';
import { LoaderComponent } from './loader/loader.component';
import { MoreButtonComponent } from './buttons/more-button/more-button.component';
import { CardsGroupComponent } from './cards-group/cards-group.component';
import { LocalstorageService } from './services/localstorage.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    HttpClientModule,
    MusicCardComponent,
    LoaderComponent,
    MoreButtonComponent,
    CardsGroupComponent
  ],
  providers: [SpotifyService, LocalstorageService],
  declarations: [HeaderComponent, MusicCardComponent, LoaderComponent, MoreButtonComponent, CardsGroupComponent]
})
export class SharedModule {
}
