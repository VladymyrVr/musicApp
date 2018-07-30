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

  handleChange(id: string) {
    this.spotify.getArtists(id)
      .subscribe(artists => {
        console.log(artists);
        this.artists = artists;
      });

  }

}
