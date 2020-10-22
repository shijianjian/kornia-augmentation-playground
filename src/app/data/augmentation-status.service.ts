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
    if (name == "RandomAffine") {
      return of({p: 0.5});
    }
    return of({
      "firstName": "Joan",
      "lastName": "of Arc"
    })
  }

  getFields(name: string): Observable<any> {
    // return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form_json');
    if ((name == "RandomHorizontalFlip") || (name == "RandomVerticalFlip")) {
      return of([this.getCommonFields("p")]);
    }
    if (name == "ColorJitter") {
      return of([
        this.getCommonFields("brightness"),
        this.getCommonFields("contrast"),
        this.getCommonFields("saturation"),
        this.getCommonFields("hue"),
        this.getCommonFields("p"),
      ]);
    }
    if (name == "RandomAffine") {
      return of([this.getCommonFields("p")]);
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

  getCommonFields(key) {
    return {
      key: key,
      type: "input",
      templateOptions: {
        type: "number",
        label: "Probablities of applying the augmentation",
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