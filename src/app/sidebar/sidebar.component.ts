import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AugmentationService } from '../augmentation.service';

@Component({
  selector: 'kornia-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() hidden;

  codes = "";
  codes_sub;
  current_step = 0
  isDisplayingCode = false;
  augmentationType: string;

  augmentationData = [];
  augmentationList = [];
  private augmentationList2D = [
    {name: 'RandomHorizontalFlip', kwargs: {p: 0.5}},
    {name: 'RandomVerticalFlip', kwargs: {p: 0.5}},
    {name: 'ColorJitter', kwargs: {p: 0.5}},
  ];
  private augmentationList3D = []

  constructor(private augmentationService: AugmentationService) {
  }

  ngOnInit() {
    this.augmentationList = this.augmentationList2D;
    this.codes_sub = this.augmentationService.codes.subscribe(data => {
      this.codes = data['code'];
    });
  }

  ngOnDestroy() {
    this.codes_sub.unsubscribe()
  }

  onGetCode() {
    if (!this.isDisplayingCode) {
      this.augmentationService.getAugmentationCode();
    }
    this.isDisplayingCode = !this.isDisplayingCode;
  }

  onGetModel() {

  }

  onItemChanged(event) {
    if (event == '2D') {
      this.augmentationList = this.augmentationList2D;
    } else if (event == '3D') {
      this.augmentationList = this.augmentationList3D;
    } else {
      console.error(`${event} is not implemented.`)
    }
    this.augmentationType = event;
  }

  onAugmentationChanged(event) {
    this.augmentationData = event;
    if (event == '2D') {
      this.augmentationList2D = this.augmentationData;
    } else if (event == '3D') {
      this.augmentationList3D = this.augmentationData;
    } else {
      console.error(`${event} is not implemented.`)
    }
    this.augmentationService.formData = this.augmentationData;
  }

  runOneStep() {
    if (this.current_step >= this.augmentationData.length) {
      alert("Already finished. Will start over.")
      this.clearSteps();
      return
    }
    this.augmentationService.computeAugmentation(this.current_step);
    this.current_step += 1;
  }

  runAll() {
    let theRestIdx = []
    for (let i = this.current_step; i < this.augmentationData.length; i ++) {
      theRestIdx.push(i);
    }
    this.augmentationService.computeAugmentation(theRestIdx);
  }

  clearSteps() {
    this.current_step = 0;
  }

}
