import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../shared/services/http-spotify.service';
import { Release } from '../../shared/models/release';
import { ItemPlaylist } from '../../shared/models/item-playlist';
import { ItemCategories} from '../../shared/models/item-categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  releases: Release[];
  playlist: ItemPlaylist[];
  categories: ItemCategories[];

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
    this.spotify.getMainData().subscribe(dataList => {
      this.releases = dataList[0];
      this.playlist = dataList[1].playlists.items;
      this.categories = dataList[2];
    });
  }

}
