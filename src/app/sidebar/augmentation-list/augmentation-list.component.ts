import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-augmentation-list',
  templateUrl: './augmentation-list.component.html',
  styleUrls: ['./augmentation-list.component.css']
})
export class AugmentationListComponent implements OnInit {

  isDebugMode = false;

  formData = [];
  new_ele = 0
  current_step = 0

  augmentationList = [
    {name: 'RandomHorizontalFlip', number: this.new_ele},
    {name: 'RandomVerticalFlip', number: 0},
    {name: 'ColorJitter', number: 0},
    {name: 'RandomAffine', number: 0},
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.augmentationList, event.previousIndex, event.currentIndex);
    this.updateFormDataIndex(event.previousIndex, event.currentIndex);
  }

  addNewAugmentation() {
    this.new_ele += 1
    this.augmentationList.push({name: 'RandomHorizontalFlip', number: this.new_ele});
  }

  onFormUpdated(data, idx: number) {
    data.index = idx;
    if (idx < this.formData.length) {
      this.formData[idx] = data
    } else {
      this.formData.push(data);
    }
  }

  updateFormDataIndex(previousIndex: number, currentIndex: number) {
    let element = this.formData[previousIndex];
    this.formData.splice(previousIndex, 1);
    this.formData.splice(currentIndex, 0, element);

    for (let i = 0; i < this.formData.length; i ++) {
      this.formData[i].index = i
    }
  }

  runOneStep() {
    if (this.current_step >= this.formData.length) {
      alert("Already finished. Will start over.")
      this.clearSteps();
      return
    }
    this.augmentationService.setting = this.formData[this.current_step];
    this.augmentationService.computeAugmentation()
    this.current_step += 1;
  }

  runAll() {
    for (let i = this.current_step; i < this.formData.length; i ++) {
      this.runOneStep();
    }
  }

  clearSteps() {
    this.current_step = 0;
  }

  constructor(private augmentationService: AugmentationService) { }

  ngOnInit() {
  }

}
