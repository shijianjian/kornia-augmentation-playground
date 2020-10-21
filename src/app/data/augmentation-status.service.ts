import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';

@Injectable()
export class AugmentationStatusService {
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return forkJoin([this.getUser(), this.getFields()]);
  }

  getUser() {
    // return this.http.get<{ firstName: string, lastName: string }>('assets/json-powered/user_json');
    return of({
      "firstName": "Joan",
      "lastName": "of Arc"
    })
  }

  getFields() {
    // return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form_json');
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
        "type": "input",
        "templateOptions": {
          "label": "Color Preference (try this out)"
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

  getColors() {
    // return this.http.get<{ label: string; value: string }[]>('assets/json-powered/colors_json');
    return of([
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
    ])
  }
}