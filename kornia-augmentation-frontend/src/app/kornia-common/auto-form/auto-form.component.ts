import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { AugmentationStatusService } from '../../data/augmentation-status.service';
import { KorniaFormDataControl, get_random_id } from "src/app/data/utils";

@Component({
  selector: 'kornia-auto-form',
  templateUrl: './auto-form.component.html',
  styleUrls: ['./auto-form.component.css']
})
export class AutoFormComponent implements OnInit {

  autoFormName: string;
  @Input() operation: KorniaFormDataControl;
  @Output() formUpdated = new EventEmitter<object>();

  form: FormGroup;
  form_left: FormGroup;
  form_right: FormGroup;
  model: any;
  fields_left: FormlyFieldConfig[] = [];
  fields_right: FormlyFieldConfig[] = [];

  selectionList: [];

  constructor(
    private augmentationStatusService: AugmentationStatusService
  ) {
    this.autoFormName = `operation_${get_random_id()}`;
    this.augmentationStatusService.getAugmentationList().subscribe(selectionList => {
      this.form = new FormGroup({[this.autoFormName]: new FormControl('')});
      this.form_left = new FormGroup({});
      this.form_right = new FormGroup({});
      this.selectionList = selectionList;
    });
  }

  ngOnInit() {
    if (this.operation != undefined) {
      this.setOperation(this.operation);
    }
  }

  onFormControlUpdated(kwargs: object, name?: string) {
    if (this.operation == undefined) {
      // define the operation if it has not been set yet
      this.operation = new KorniaFormDataControl(name, kwargs);
      this.setOperation(this.operation);
    } else {
      if (this.form_left.valid && this.form_right.valid) {
          this.operation.name = name;
          this.operation.kwargs = kwargs;
          this.setOperation(this.operation);
      };
    }
  }

  setOperation(operation: KorniaFormDataControl) {
    this.form.controls[this.autoFormName].setValue(operation.name);
    this.augmentationStatusService
      .getAugmentationFieldData(operation.name, operation.timestamp).subscribe(([model, fields]) => {
        if (operation.kwargs) {
          this.model = this.operation.kwargs;
        } else {
          this.model = model;
          this.operation.kwargs = model;
        }
        this.fields_left = this.mapFields(fields, 'left');
        this.fields_right = this.mapFields(fields, 'right');
        this.formUpdated.emit(this.operation);
      });
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
