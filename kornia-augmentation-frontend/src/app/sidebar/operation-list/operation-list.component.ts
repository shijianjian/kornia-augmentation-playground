import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { KorniaFormDataControl } from 'src/app/data/utils';

@Component({
  selector: 'kornia-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent {

  isDebugMode = false;

  operationformData: KorniaFormDataControl[] = [];

  @Input() set operationData(value: KorniaFormDataControl[]) {
    this.operationformData = []
    value.forEach((v, i) => {
      this.addOperation(v);
    })
  }
  get operationData() {
    return this.operationformData;
  }
  @Output() operationDataChanged = new EventEmitter<object[]>();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.operationData, event.previousIndex, event.currentIndex);
    this.updateFormDataIndex(event.previousIndex, event.currentIndex);
  }

  addOperation(operation: KorniaFormDataControl) {
    this.operationformData.push(operation);
  }

  onFormUpdated(data, idx: number) {
    if (idx < this.operationformData.length) {
      this.operationformData[idx] = data
    } else {
      this.operationformData.push(data);
    }
    this.onAugmentationListUpdated();
  }

  onFormDeleted(event, idx: number) {
    if (event['value']) {
      this.operationformData.splice(idx, 1);
      this.onAugmentationListUpdated();
    }
  }

  onAugmentationListUpdated() {
    this.operationDataChanged.emit(this.operationformData);
  }

  updateFormDataIndex(previousIndex: number, currentIndex: number) {
    let element = this.operationformData[previousIndex];
    this.operationformData.splice(previousIndex, 1);
    this.operationformData.splice(currentIndex, 0, element);
    this.onAugmentationListUpdated();
  }

}
