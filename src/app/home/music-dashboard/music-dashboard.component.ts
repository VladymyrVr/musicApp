import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import {  Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';
import { Artist } from '../../shared/models/artist';
import { Release } from '../../shared/models/release';
import { ItemPlaylist } from '../../shared/models/item-playlist';

@Component({
  selector: 'app-music-dashboard',
  templateUrl: './music-dashboard.component.html',
  styleUrls: ['./music-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicDashboardComponent implements OnInit, OnDestroy {
  p = 1;
  data: Artist[] | Release[] | ItemPlaylist[];
  message: string;
  loading = false;
  private unsubscribe$ = new Subject();

  constructor(private spotify: SpotifyService, private  cdr: ChangeDetectorRef, private route: ActivatedRoute) {
  }

  // getData(spotifyFunction: () => any) {
  //   spotifyFunction()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(res => {
  //         this.data = res;  //         this.loading = false;
  //         this.cdr.detectChanges();
  //       },
  //       (error) => {
  //         this.loading = false;
  //         console.error(error);
  //       });
  // }

  ngOnInit() {
    this.loading = true;
    this.route.snapshot.data['artist'] ?
      this.spotify.artist
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            console.log(res);
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
        ) : this.route.snapshot.data['topTrack'] ?
        this.spotify.getRecommendations()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
              this.data = res.playlists.items;
              this.message = res.message;
              console.log(this.data);
              this.loading = false;
              this.cdr.detectChanges();
            },
            (error) => {
              this.loading = false;
              console.error(error);
            }
          ) : this.loading = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
