import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-more-button',
  template: `<button (click)="increaseCount()">More</button>`,
  styleUrls: ['./more-button.component.less']
})
export class MoreButtonComponent {
  @Output() onChanged = new EventEmitter<number>();
  count = 6;

  increaseCount() {
    this.count += 6;
    this.onChanged.emit(this.count);
  }

}
