import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/index';
import { Release } from '../../shared/models/release';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  p = 1
  releases: Release[];
  loading = false;
  private unsubscribe$ = new Subject();

  constructor(private spotify: SpotifyService, private  cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loading = true;
    this.spotify.getNewReleases()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.releases = res;
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
