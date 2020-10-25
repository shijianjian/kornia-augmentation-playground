import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'kornia-results-thumbnail',
  templateUrl: './results-thumbnail.component.html',
  styleUrls: ['./results-thumbnail.component.css']
})
export class ResultsThumbnailComponent {

  @Input() images;
  @Input() wrap: boolean = false;
  @Output() imageClicked = new EventEmitter<number>();

  constructor() { }

  onClickImage(i) {
    this.imageClicked.emit(i);
  }
}
