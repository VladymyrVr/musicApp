import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { Release } from '../models/release';
import { Playlist } from '../models/playlist';
import { ItemPlaylist } from '../models/item-playlist';
import { FavoriteService } from '../../home/services/favorite.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicCardComponent implements OnInit {
  @Input() item: Artist | Release | Playlist | ItemPlaylist;
  @Input() hidden: boolean;
  @Output() AddFavorite = new EventEmitter();
  favorite: boolean;


  constructor(private fs: FavoriteService) {
  }

  ngOnInit() {
    this.newCheck();
  }

  handleClick(item) {
    this.AddFavorite.emit(item);
    this.newCheck();
    console.log(this.favorite);
  }

  newCheck() {
    this.favorite = this.fs.newCollection(this.item['id'] ? this.item['id'] : this.item['track'].id);
  }
}

