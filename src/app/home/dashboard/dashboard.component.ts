import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { Release } from '../../shared/models/release';
import { ItemPlaylist } from '../../shared/models/item-playlist';
import { ItemCategories } from '../../shared/models/item-categories';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  releases: Release[];
  playlist: ItemPlaylist[];
  categories: ItemCategories[];

  constructor(private spotify: SpotifyService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.spotify.getMainData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(dataList => {
        this.releases = dataList[0];
        this.playlist = dataList[1].playlists.items;
        this.categories = dataList[2];
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
