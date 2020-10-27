import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'kornia-icon-side-bar',
  templateUrl: './icon-side-bar.component.html',
  styleUrls: ['./icon-side-bar.component.css']
})
export class IconSideBarComponent implements OnInit {

  @Input() defaultItem: string;
  @Output() itemChanged = new EventEmitter()

  allItems: string[] = ['Aug', 'CV'];
  disableRipple = true;

  constructor() { }

  ngOnInit() {
  }

  onRadioChanged(event) {
    this.itemChanged.emit(event.value)
  }

}
