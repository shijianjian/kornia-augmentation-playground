import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';

@Injectable()
export class AugmentationStatusService {
  constructor(private http: HttpClient) {}

  getAugmentationFieldData(name: string): Observable<any> {
    return forkJoin([this.getDefault(name), this.getFields(name)]);
  }

  getAugmentationList(): Observable<any> {
    return of([
      'RandomHorizontalFlip',
      'RandomVerticalFlip',
      'RandomRotation',
      'RandomAffine',
      'RandomPerspective',
      'RandomErasing',
      'CenterCrop',
      'RandomCrop',
      'RandomResizedCrop',
      'RandomMotionBlur',
      'ColorJitter',
      'RandomGrayscale',
      'RandomSolarize',
      'RandomPosterize',
      'RandomEqualize',
    ])
  }

  getDefault(name: string): Observable<any>  {
    // return this.http.get<{ firstName: string, lastName: string }>('assets/json-powered/user_json');
    if ((name == "RandomHorizontalFlip") || (name == "RandomVerticalFlip")) {
      return of({p: 0.5});
    }
    if (name == "ColorJitter") {
      return of({
        p: 0.5, brightness: 0.5, contrast: 0.5, saturation: 0.5, hue: 0.3
      });
    }
    return of({p: 0.5});
  }

  getFields(name: string): Observable<any> {
    // return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form_json');
    if ((name == "RandomHorizontalFlip") || (name == "RandomVerticalFlip")) {
      return of([this.getCommonFields("p", "Probablities of applying the augmentation")]);
    }
    if (name == "ColorJitter") {
      return of([
        this.getCommonFields("brightness", "Brightness range"),
        this.getCommonFields("contrast", "Contrast range"),
        this.getCommonFields("saturation", "Saturation range"),
        this.getCommonFields("hue", "Hue range"),
        this.getCommonFields("p", "Probablities of applying the augmentation"),
      ]);
    }
    return of([this.getCommonFields("p", "This function has not been added yet.")]);
    }

  getCommonFields(key, label) {
    return {
      key: key,
      type: "input",
      templateOptions: {
        type: "number",
        label: label,
        pattern: "^(0(\.[0-9]{1,4})?|1(\.0{1,4})?)$"
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `Expected to be within 0 to 1. Got "${field.formControl.value}".`,
        },
      },
    }
  }


}