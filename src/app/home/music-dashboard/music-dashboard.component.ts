import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { Subject } from 'rxjs/index';
import { switchMap, takeUntil } from 'rxjs/internal/operators';
import { Artist } from '../../shared/models/artist';
import { Release } from '../../shared/models/release';
import { ItemPlaylist } from '../../shared/models/item-playlist';
import { TrackItem } from '../../shared/models/track-item';
import { FavoriteService } from '../services/favorite.service';
import { LocalstorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-music-dashboard',
  templateUrl: './music-dashboard.component.html',
  styleUrls: ['./music-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicDashboardComponent implements OnInit, OnDestroy {
  p = 1;
  data: Artist[] | Release[] | ItemPlaylist[] | TrackItem[];
  message: string;
  loading = false;
  private unsubscribe$ = new Subject();

  constructor(private spotify: SpotifyService,
              private  cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private favorite: FavoriteService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.snapshot.data['artist'] ?
      this.spotify.artist
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.data = res;
            this.loading = false;
            this.cdr.detectChanges();
          },
          (error) => {
            this.loading = false;
            console.error(error);
          }
        )
      : this.route.snapshot.data['releases'] ?
      this.spotify.getNewReleases()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.data = res;
            this.loading = false;
            this.cdr.detectChanges();
          },
          (error) => {
            this.loading = false;
            console.error(error);
          }
        ) : this.route.snapshot.data['playlist'] ?
        this.spotify.getRecommendations()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
              this.data = res.playlists.items;
              this.message = res.message;
              this.loading = false;
              this.cdr.detectChanges();
            },
            (error) => {
              this.loading = false;
              console.error(error);
            }
          ) : this.route.snapshot.data['playlistItem'] ?
          this.route.params
            .pipe(takeUntil(this.unsubscribe$),
              switchMap(params => this.spotify.getCategoriesPlaylist(params['id'])))
            .subscribe(res => {
                this.data = res;
                this.loading = false;
                this.cdr.detectChanges();
              }
            ) : this.route.snapshot.data['trackItem'] ?
            this.route.params
              .pipe(takeUntil(this.unsubscribe$),
                switchMap(params => this.spotify.getPlaylistsTracks(params['id'])))
              .subscribe(res => {
                  this.data = res;
                  this.loading = false;
                  this.cdr.detectChanges();
                }
              ) : this.loading = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clickFavorite(item) {
    if (item.id) {
      this.favorite.addToFavorite(item.id, this.route.snapshot.data['type']);
    } else {
      this.favorite.addToFavorite(item.track.id, this.route.snapshot.data['type']);
    }
  }
}
