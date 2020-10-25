import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'kornia-augmentation-list',
  templateUrl: './augmentation-list.component.html',
  styleUrls: ['./augmentation-list.component.css']
})
export class AugmentationListComponent {

  isDebugMode = false;

  _formData = [];
  ele_count = 0

  augmentationList: object[] = [];

  @Input() set augmentationData(value: object[]) {
    this._formData = value;
    this.augmentationList = [];
    value.forEach((v, i) => {
      this.ele_count += 1;
      this.addNewAugmentation(v['name']);
    })
  }
  get augmentationData() {
    return this._formData;
  }
  @Output() augmentationChanged = new EventEmitter<object[]>();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.augmentationList, event.previousIndex, event.currentIndex);
    this.updateFormDataIndex(event.previousIndex, event.currentIndex);
  }

  addNewAugmentation(name) {
    if (name == undefined) {
      name = 'RandomHorizontalFlip';
    }
    this.ele_count += 1
    this.augmentationList.push({name: name, number: this.ele_count});
  }

  onFormUpdated(data, idx: number) {
    if (idx < this._formData.length) {
      this._formData[idx] = data
    } else {
      this._formData.push(data);
    }
    this.onAugmentationListUpdated();
  }

  onFormDeleted(event, idx: number) {
    if (event['value']) {
      this.augmentationList.splice(idx, 1);
      this._formData.splice(idx, 1);
      this.onAugmentationListUpdated();
    }
  }

  onAugmentationListUpdated() {
    this.augmentationChanged.emit(this._formData)
  }

  updateFormDataIndex(previousIndex: number, currentIndex: number) {
    let element = this._formData[previousIndex];
    this._formData.splice(previousIndex, 1);
    this._formData.splice(currentIndex, 0, element);
    this.onAugmentationListUpdated();
  }

}
