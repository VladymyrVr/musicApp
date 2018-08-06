import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotifyService } from './services/http-spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { MusicCardComponent } from './music-card/music-card.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    HttpClientModule
  ],
  providers: [SpotifyService],
  declarations: [HeaderComponent, MusicCardComponent]
})
export class SharedModule {
}
