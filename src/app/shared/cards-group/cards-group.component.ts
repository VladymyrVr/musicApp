import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-group',
  templateUrl: './cards-group.component.html',
  styleUrls: ['./cards-group.component.less']
})
export class CardsGroupComponent {
  @Input() data;
  counter = 6;
  hiddenFavorite = true;

  onChanged(count: number) {
    this.counter = count;
  }
}
