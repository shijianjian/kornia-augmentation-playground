import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { object_add_suffix, get_random_id } from "./utils";

@Injectable()
export class AugmentationStatusService {

  private supported_augmentation_list = {
    "Image Augmentations": [
      'RandomHorizontalFlip',
      'RandomVerticalFlip',
      'RandomRotation',
      'RandomAffine',
      'RandomPerspective',
      // 'RandomErasing',
      // 'CenterCrop',
      // 'RandomCrop',
      // 'RandomResizedCrop',
      'RandomMotionBlur',
      'ColorJitter',
      'RandomGrayscale',
      'RandomSolarize',
      'RandomPosterize',
      'RandomEqualize',
    ],
    "Image Filters": [
      "MotionBlur"
    ]
  }

  constructor() {}

  getAugmentationFieldData(name: string, random_id?: string): Observable<any> {
    if (random_id == undefined || random_id == null) {
      random_id = get_random_id();
    }
    random_id = `-${random_id}`;
    return forkJoin([this.getDefault(name, random_id), this.getFields(name, random_id)]);
  }

  getRandomAugmentationFieldData(): Observable<any> {
    let name = this.supported_augmentation_list[0];
    let random_id = `-${get_random_id()}`;
    return forkJoin([this.getDefault(name, random_id), this.getFields(name, random_id)]);
  }

  getAugmentationList(): Observable<any> {
    return of(this.supported_augmentation_list["Image Augmentations"]);
  }

  getOperationList(): Observable<any> {
    return of(this.supported_augmentation_list);
  }

  getDefault(name: string, random_id: string): Observable<any>  {
    // return this.http.get<{ firstName: string, lastName: string }>('assets/json-powered/user_json');
    if (
      (name == "RandomHorizontalFlip") || (name == "RandomVerticalFlip")
      || (name == 'RandomGrayscale') || (name == "RandomEqualize")
    ) {
      return of(object_add_suffix({p: 0.5}, random_id));
    }
    if (name == "ColorJitter") {
      return of(object_add_suffix({
        p: 0.5, brightness: 0.5, contrast: 0.5, saturation: 0.5, hue: 0.3
      }, random_id));
    }
    if (name == "RandomAffine") {
      return of(object_add_suffix({p: 0.5, degrees: 60, shear: 50}, random_id));
    }
    if (name == "RandomRotation") {
      return of(object_add_suffix({p: 0.5, degrees: 60}, random_id));
    }
    if (name == "RandomSolarize") {
      return of(object_add_suffix({p: 0.5, thresholds: 0.1, additions: 0.1}, random_id));
    }
    if (name == "RandomPosterize") {
      return of(object_add_suffix({p: 0.5, bits: 3}, random_id));
    }
    if (name == "RandomSharpness") {
      return of(object_add_suffix({p: 0.5, sharpness: 0.5}, random_id));
    }
    if (name == "RandomMotionBlur") {
      return of(object_add_suffix({p: 0.5, kernel_size: 3, angle: 30, direction: 0.5}, random_id));
    }
    if (name == "RandomPerspective") {
      return of(object_add_suffix({p: 0.5, distortion_scale: 0.5}, random_id));
    }
    // For image filters
    if (name == "MotionBlur") {
      return of(object_add_suffix({kernel_size: 3, angle: 30, direction: 0.5}, random_id));
    }
    return of(object_add_suffix({p: 0.5}, random_id));
  }

  getFields(name: string, random_id: string): Observable<any> {
    // return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form_json');
    if (
      (name == "RandomHorizontalFlip") || (name == "RandomVerticalFlip")
      || (name == 'RandomGrayscale') || (name == "RandomEqualize")
    ) {
      return of([this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)]);
    }
    if (name == "ColorJitter") {
      return of([
        this.getCommonFields("brightness" + random_id, "Brightness range", 0, 1),
        this.getCommonFields("contrast" + random_id, "Contrast range", 0, 1),
        this.getCommonFields("saturation" + random_id, "Saturation range", 0, 1),
        this.getCommonFields("hue" + random_id, "Hue range", 0, 1),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1),
      ]);
    }
    if (name == "RandomAffine") {
      return of([
        this.getCommonFields("shear" + random_id, "Shear range", 0, 360),
        this.getCommonFields("degrees" + random_id, "Degree range", 0, 360),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1),
      ]);
    }
    if (name == "RandomRotation") {
      return of([
        this.getCommonFields("degrees" + random_id, "Degree range", 0, 360),
        this.getCommonFields("degrees" + random_id, "Degree range", 0, 360),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)
      ]);
    }
    if (name == "RandomSolarize") {
      return of([
        this.getCommonFields("thresholds" + random_id, "Thresholds", 0, 1),
        this.getCommonFields("additions" + random_id, "Additions", 0, 1),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)
      ]);
    }
    if (name == "RandomPosterize") {
      return of([
        this.getCommonFields("bits" + random_id, "bits", 1, 8),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)
      ]);
    }
    if (name == "RandomSharpness") {
      return of([
        this.getCommonFields("sharpness" + random_id, "bits", 0, 1),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)
      ]);
    }
    if (name == "RandomMotionBlur") {
      return of([
        this.getCommonFields("kernel_size" + random_id, "kernel_size", 3, 30),
        this.getCommonFields("angle" + random_id, "angle", 0, 360),
        this.getCommonFields("direction" + random_id, "direction", -1, 1),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)
      ]);
    }
    if (name == "RandomPerspective") {
      return of([
        this.getCommonFields("distortion_scale" + random_id, "direction", 0, 1),
        this.getCommonFields("p" + random_id, "Probablities of applying the augmentation", 0, 1)
      ]);
    }
    // For image filters
    if (name == "MotionBlur") {
      return of([
        this.getCommonFields("kernel_size" + random_id, "kernel_size, should be odd and positive", 3, 30),
        this.getCommonFields("angle" + random_id, "angle", 0, 360),
        this.getCommonFields("direction" + random_id, "direction", -1, 1),
      ]);
    }
    alert(`${name} is not yet supported.`)
    return of([this.getCommonFields("p" + random_id, "This function has not been added yet.", 0, 1)]);
  }

  getCommonFields(key, label, min, max) {
    return {
      key: key,
      type: "input",
      templateOptions: {
        type: "number",
        label: label,
        step: (max - min) / 100,
        min: min,
        max: max,
      },
      modelOptions: {
        updateOn: 'blur',
      },
      validation: {
        messages: {
          min: (error, field: FormlyFieldConfig) => `Expected to be within ${min} to ${max}. Got "${field.formControl.value}".`,
          max: (error, field: FormlyFieldConfig) => `Expected to be within ${min} to ${max}. Got "${field.formControl.value}".`,
        },
      },
    }
  }
}
