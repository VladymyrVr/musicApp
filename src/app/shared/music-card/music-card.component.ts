import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Artist } from '../models/artist';
import { Release } from '../models/release';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicCardComponent implements OnInit {
  @Input() item: Artist | Release;

  constructor() {
  }

  ngOnInit() {
  }

}
