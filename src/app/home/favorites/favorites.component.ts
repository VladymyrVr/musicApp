import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalstorageService } from '../../shared/services/localstorage.service';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { Track } from '../../shared/models/track';
import { Artist } from '../../shared/models/artist';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit, OnDestroy {
  tracks: Track[];
  artists: Artist[];
  favoriteData = {};
  private unsubscribe$ = new Subject();


  constructor(private storage: LocalstorageService,
              private spotify: SpotifyService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.init(this.favoriteData, 'artists', 'track');
    this.spotify.getFavoriteData(this.favoriteData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(dataList => {
        this.tracks = dataList[0]['tracks'];
        this.artists = dataList[1]['artists'];
        this.cdr.detectChanges();
      });
  }

  init(obj, ...type) {
    type.forEach(typeN => obj[typeN] = this.storage.get(typeN));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
