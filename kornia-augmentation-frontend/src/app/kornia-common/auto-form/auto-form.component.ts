import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { AugmentationStatusService } from '../../data/augmentation-status.service';

@Component({
  selector: 'kornia-auto-form',
  templateUrl: './auto-form.component.html',
  styleUrls: ['./auto-form.component.css']
})
export class AutoFormComponent implements OnInit {

  @Input() defaultAugmentation: string
  @Output() augmentationSelected = new EventEmitter<string>();
  @Output() formUpdated = new EventEmitter<object>();

  form: FormGroup;
  form_left: FormGroup;
  form_right: FormGroup;
  options: FormlyFormOptions = {};
  model: any;
  fields_left: FormlyFieldConfig[];
  fields_right: FormlyFieldConfig[];

  selectedAugmentation: string;
  selectionList: [];

  constructor(private augmentationStatusService: AugmentationStatusService) {
    this.augmentationStatusService.getAugmentationList().subscribe(selectionList => {
      this.form = new FormGroup({augmentation: new FormControl('')});
      this.form_left = new FormGroup({});
      this.form_right = new FormGroup({});
      this.selectionList = selectionList;
    });
  }

  ngOnInit() {
    if (this.defaultAugmentation != undefined) {
      this.form.controls['augmentation'].setValue(this.defaultAugmentation);
      this.onSelectionChange({value: this.defaultAugmentation});
      this.submit();
    }
  }

  onSelectionChange(event) {
    this.selectedAugmentation = event.value;
    this.augmentationSelected.emit(event.value);
    this.augmentationStatusService.getAugmentationFieldData(event.value).subscribe(([model, fields]) => {
      this.model = model;
      this.fields_left = this.mapFields(fields, 'left');
      this.fields_right = this.mapFields(fields, 'right');
      this.submit();
    });
  }

  submit() {
    if (this.form_left.valid && this.form_right.valid) {
      this.formUpdated.emit(Object.assign({}, this.model));
    }
  }

  /**
   * Adjust the JSON fields loaded from the server.
   */
  mapFields(fields: FormlyFieldConfig[], position: string) {
    return fields.filter((v, i)  => {
      if (position == 'left') {
        return i % 2 == 0;
      } else {
        return (i + 1) % 2 == 0;
      }
    });
  }
}
