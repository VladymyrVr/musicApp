import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpotifyService } from '../services/http-spotify.service';
import { FormControl, Validators } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  search = new FormControl(null, Validators.required);

  constructor(private spotify: SpotifyService) {
  }

  ngOnInit() {
    this.search.valueChanges
      .pipe(switchMap(value => this.spotify.searchArtists(value)), debounceTime(500), distinctUntilChanged())
      .subscribe(artists => {
        this.spotify.artist.next(artists);
      });
  }
}
