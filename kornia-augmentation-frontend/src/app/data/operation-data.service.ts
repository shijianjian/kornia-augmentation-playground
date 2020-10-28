import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KorniaFormDataControl, OperationTypes } from './utils';

@Injectable({
  providedIn: 'root'
})
export class OperationDataService {

  private augmentationList: OperationDataType = {
    "2D": [
      new KorniaFormDataControl("RandomHorizontalFlip", undefined, undefined, OperationTypes.IMAGE_AUG),
      new KorniaFormDataControl("ColorJitter", undefined, undefined, OperationTypes.IMAGE_AUG),
      new KorniaFormDataControl("RandomPerspective", undefined, undefined, OperationTypes.IMAGE_AUG),
    ],
    "3D": [

    ]
  };
  private computerVisionList= {}

  operationData = new BehaviorSubject<OperationDataType>(this.augmentationList);

  constructor() { }
}

interface OperationDataType {
  [key: string]: KorniaFormDataControl[],
}