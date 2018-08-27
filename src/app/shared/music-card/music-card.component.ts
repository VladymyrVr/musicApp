import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Artist } from '../models/artist';
import { Release } from '../models/release';
import { Playlist } from '../models/playlist';
import { ItemPlaylist } from '../models/item-playlist';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicCardComponent {
  @Input() item: Artist | Release | Playlist | ItemPlaylist;
  @Output() AddFavorite = new EventEmitter();

  handleClick (item)  {
    this.AddFavorite.emit(item);
  }
}

