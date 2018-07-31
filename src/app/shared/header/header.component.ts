import { Component, OnInit } from '@angular/core';
import {HttpSpotifyService} from '../services/http-spotify.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  artists: any[] = [];

  constructor(private spotify: HttpSpotifyService) {  }

  ngOnInit() {
  }

  handleChange(artist: string) {
    this.spotify.searchArtists(artist);
  }

}
