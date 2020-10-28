import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KorniaFormDataControl } from './utils';

@Injectable({
  providedIn: 'root'
})
export class OperationDataService {

  private augmentationList: OperationDataType = {
    "2D": [
      new KorniaFormDataControl("RandomHorizontalFlip", undefined),
      new KorniaFormDataControl("ColorJitter", undefined),
      new KorniaFormDataControl("RandomPerspective", undefined),
    ],
    "3D": [

    ]
  };
  private computerVisionList= {}

  operationData = new BehaviorSubject<OperationDataType>(this.augmentationList);

  constructor() { }

//   updateOperationDataByKey(item) {
//     if (item == 'Aug') {
//       this.operationData.next(this.augmentationList);
//     } else if (item == 'CV') {
//       this.operationData.next(this.computerVisionList);
//     } else {
//       console.error(`${item} is not implemented.`)
//     }
//   }

//   saveCurrentOperationData(key, data) {
//     if (key == 'Aug') {
//       this.augmentationList = data;
//     } else if (key == 'CV') {
//       this.computerVisionList = data;
//     } else {
//       console.error(`${key} is not implemented.`)
//     }
//   }
}

interface OperationDataType {
  [key: string]: KorniaFormDataControl[],
}