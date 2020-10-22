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
      return of(this.getCommonDefault());
    }
    if (name == "ColorJitter") {
      return of(this.getCommonDefault());
    }
    if (name == "RandomAffine") {
      return of(this.getCommonDefault());
    }
    return of({
      "firstName": "Joan",
      "lastName": "of Arc"
    })
  }

  getFields(name: string): Observable<any> {
    // return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form_json');
    if ((name == "RandomHorizontalFlip") || (name == "RandomVerticalFlip")) {
      return of(this.getCommonFields());
    }
    if (name == "ColorJitter") {
      return of(this.getCommonFields());
    }
    if (name == "RandomAffine") {
      return of(this.getCommonFields());
    }
    return of([
      {
        "key": "firstName",
        "type": "input",
        "templateOptions": {
          "label": "First Name"
        }
      },
      {
        "key": "lastName",
        "type": "input",
        "templateOptions": {
          "label": "Last Name"
        }
      },
      {
        "key": "mac",
        "type": "input",
        "templateOptions": {
          "label": "Mac Address",
          "pattern": "([0-9A-F]{2}[:-]){5}([0-9A-F]{2})"
        }
      },
      {
        "key": "color",
        "type": "radio",
        "templateOptions": {
          "label": "Color Preference (try this out)",
          "options": [
            {
              "label": "No Preference",
              "value": null
            },
            {
              "label": "Green",
              "value": "green"
            },
            {
              "label": "Blue",
              "value": "blue"
            }
          ]
        }
      },
      {
        "key": "reason",
        "type": "textarea",
        "templateOptions": {
          "label": "Why?"
        },
        "expressionProperties": {
          "templateOptions.label": "'Why did you choose ' + model.color + '?'"
        },
        "hideExpression": "!model.color"
      }
    ])
  }

  getCommonDefault() {
    return {"p": 0.5}
  }

  getCommonFields() {
    return [{
      key: "p",
      type: "input",
      templateOptions: {
        label: "Probablities of applying the augmentation",
        pattern: "^(0(\.[0-9]{1,4})?|1(\.0{1,4})?)$"
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `Expected to be within 0 to 1. Got "${field.formControl.value}".`,
        },
      },
    }]
  }


}