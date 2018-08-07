import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';
import { Artist } from '../../shared/models/artist';

@Component({
  selector: 'app-music-dashboard',
  templateUrl: './music-dashboard.component.html',
  styleUrls: ['./music-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicDashboardComponent implements OnInit, OnDestroy {
  p = 1;
  artists: Artist[];
  loading = false;
  private unsubscribe$ = new Subject();

  constructor(private spotify: SpotifyService, private  cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loading = true;
    this.spotify.artist
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.artists = res;
          this.loading = false;
          this.cdr.detectChanges();
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
