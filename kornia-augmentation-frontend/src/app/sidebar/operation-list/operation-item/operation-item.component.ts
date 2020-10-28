import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KorniaFormDataControl } from 'src/app/data/utils';

@Component({
  selector: 'kornia-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.css']
})
export class OperationItemComponent {

  @Input() item: KorniaFormDataControl;
  @Output() formUpdated = new EventEmitter<object>();
  @Output() formDeleted = new EventEmitter<object>();
  @Output() singleRunSelected = new EventEmitter<boolean>();

  panel_opened = false;
  show_details = true;

  constructor() { }

  onFormUpdated(item: KorniaFormDataControl) {
    this.formUpdated.emit(item);
  }

  onOpened() { this.panel_opened = true; }
  onClosed() { this.panel_opened = false; }

  onRemove() {
    let toRemove = confirm("Are you sure to remove the augmenation?")
    if (toRemove) {
      this.formDeleted.emit({"value": toRemove});
    }
  }

  onRun() {
    this.singleRunSelected.emit(true);
  }

}
