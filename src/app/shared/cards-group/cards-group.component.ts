import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-group',
  templateUrl: './cards-group.component.html',
  styleUrls: ['./cards-group.component.less']
})
export class CardsGroupComponent {
  @Input() data;
  counter = 6;

  onChanged(count: number) {
    this.counter = count;
  }

}
