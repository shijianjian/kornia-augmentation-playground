import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-augmentation-list',
  templateUrl: './augmentation-list.component.html',
  styleUrls: ['./augmentation-list.component.css']
})
export class AugmentationListComponent {

  isDebugMode = false;

  formData = [];
  new_ele = 0
  current_step = 0

  augmentationList: object[];

  private _listName: string;
  private augmentationList2D = [
    {name: 'RandomHorizontalFlip', number: this.new_ele},
    {name: 'RandomVerticalFlip', number: 0},
    {name: 'ColorJitter', number: 0},
    // {name: 'RandomAffine', number: 0},
  ];
  private augmentationList3D = [
    // {name: 'ColorJitter', number: 0},
  ]

  @Input() set listName(value: string) {
    this.formData = [];
    if (value == '2D') {
      this.augmentationList = this.augmentationList2D;
    } else if (value == '3D') {
      this.augmentationList = this.augmentationList3D;
    } else {
      console.error(`${value} is not implemented.`)
    }
    this._listName = value;
  }
  get listName(): string {
      return this._listName;
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.augmentationList, event.previousIndex, event.currentIndex);
    this.updateFormDataIndex(event.previousIndex, event.currentIndex);
  }

  addNewAugmentation() {
    this.new_ele += 1
    this.augmentationList.push({name: 'RandomHorizontalFlip', number: this.new_ele});
  }

  onFormUpdated(data, idx: number) {
    if (idx < this.formData.length) {
      this.formData[idx] = data
    } else {
      this.formData.push(data);
    }
    this.onAugmentationListUpdated();
  }

  onFormDeleted(event, idx: number) {
    if (event['value']) {
      this.augmentationList.splice(idx, 1);
      this.formData.splice(idx, 1);
      this.onAugmentationListUpdated();
    }
  }

  onAugmentationListUpdated() {
    this.augmentationService.formData = this.formData;
  }

  updateFormDataIndex(previousIndex: number, currentIndex: number) {
    let element = this.formData[previousIndex];
    this.formData.splice(previousIndex, 1);
    this.formData.splice(currentIndex, 0, element);
    this.onAugmentationListUpdated();
  }

  runOneStep() {
    if (this.current_step >= this.formData.length) {
      alert("Already finished. Will start over.")
      this.clearSteps();
      return
    }
    this.augmentationService.computeAugmentation(this.current_step);
    this.current_step += 1;
  }

  runAll() {
    let theRestIdx = []
    for (let i = this.current_step; i < this.formData.length; i ++) {
      theRestIdx.push(i);
    }
    this.augmentationService.computeAugmentation(theRestIdx);
  }

  clearSteps() {
    this.current_step = 0;
  }

  constructor(private augmentationService: AugmentationService) { }
}
