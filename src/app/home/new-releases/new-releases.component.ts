import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../../shared/services/http-spotify.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.less', '../music-dashboard/music-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewReleasesComponent implements OnInit {
  p = 1;
  releases;
  loading = false;
  constructor(private spotify: SpotifyService, private  cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe(res => {
          this.releases = res;
          this.loading = false;
          this.cdr.detectChanges();
          console.log(this.releases);
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }

}
