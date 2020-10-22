import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'kornia-augmentation-item',
  templateUrl: './augmentation-item.component.html',
  styleUrls: ['./augmentation-item.component.css']
})
export class AugmentationItemComponent {

  @Input() item: object;
  @Output() formUpdated = new EventEmitter<object>();

  fields;

  constructor() {
  }

  onFormUpdated(fields: object) {
    this.fields = fields;
    fields['name'] = this.item['name'];
    this.formUpdated.emit(fields);
  }

}
