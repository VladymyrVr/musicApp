import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-group',
  templateUrl: './cards-group.component.html',
  styleUrls: ['./cards-group.component.less']
})
export class CardsGroupComponent implements OnInit {
  @Input() data;
  counter = 6;

  constructor() {
  }

  ngOnInit() {
  }

  onChanged(count: number) {
    this.counter = count;
  }

}
