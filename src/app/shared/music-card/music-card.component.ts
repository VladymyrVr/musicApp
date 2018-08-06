import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.less']
})
export class MusicCardComponent implements OnInit {
  @Input() artists

  constructor() { }

  ngOnInit() {
  }

}
