import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/index';
import { Releases } from '../../shared/models/releases';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.less', '../music-dashboard/music-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  p = 1;
  releases: Releases[];
  loading = false;

  constructor(private spotify: SpotifyService, private  cdr: ChangeDetectorRef) {
  }

  private unsubscribe: Subject<void> = new Subject();

  ngOnInit() {
    this.loading = true;
    this.spotify.getNewReleases()
      .pipe(takeUntil(this.unsubscribe))
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
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
