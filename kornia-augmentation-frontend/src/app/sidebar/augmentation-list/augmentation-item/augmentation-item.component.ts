import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kornia-augmentation-item',
  templateUrl: './augmentation-item.component.html',
  styleUrls: ['./augmentation-item.component.css']
})
export class AugmentationItemComponent {

  @Input() item: object;
  @Output() formUpdated = new EventEmitter<object>();
  @Output() formDeleted = new EventEmitter<object>();

  fields;
  panel_opened = false;
  show_details = true;

  constructor() {
  }

  onFormUpdated(fields: object) {
    this.fields = {};
    this.fields['name'] = this.item['name'];
    this.fields['kwargs'] = fields;
    this.formUpdated.emit(this.fields);
  }

  onOpened() { this.panel_opened = true; }
  onClosed() { this.panel_opened = false; }

  onRemove() {
    let toRemove = confirm("Are you sure to remove the augmenation?")
    if (toRemove) {
      this.formDeleted.emit({"value": toRemove});
    }
  }

}
