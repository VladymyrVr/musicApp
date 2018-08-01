import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../services/http-spotify.service';

@Component({
  selector: 'app-music-dashboard',
  templateUrl: './music-dashboard.component.html',
  styleUrls: ['./music-dashboard.component.less']
})
export class MusicDashboardComponent implements OnInit {
  public artists;
  public loading = true;
  constructor(private spotify: SpotifyService) {
  }

  ngOnInit() {
    this.spotify.artist
      .subscribe(res => {
        this.artists = res;
        this.loading = false;
      });
  }

}
