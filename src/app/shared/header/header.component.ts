import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/http-spotify.service';
import {FormControl, Validators} from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  search = new FormControl(null,  Validators.required);

  constructor(private spotify: SpotifyService) {  }

  ngOnInit() {
      this.search.valueChanges
        .pipe(switchMap(value => this.spotify.searchArtists(value)))
        .subscribe(artists => {
          this.spotify.artist.next(artists);
        });
    }
}
