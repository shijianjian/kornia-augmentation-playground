import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AugmentationService } from 'src/app/augmentation.service';
import { KorniaFormDataControl } from 'src/app/data/utils';

@Component({
  selector: 'kornia-action-area',
  templateUrl: './action-area.component.html',
  styleUrls: ['./action-area.component.css']
})
export class ActionAreaComponent implements OnInit, OnDestroy {


  current_step = 0
  isDebugMode: boolean;
  operationData: KorniaFormDataControl[];
  operationDataSub: Subscription;

  @Input() disabled: boolean;
  
  constructor(
    private augmentationService: AugmentationService
  ) { }

  ngOnInit() {
    this.operationDataSub = this.augmentationService.korniaFormData.subscribe(data => this.operationData = data);
  }

  ngOnDestroy() {
    this.operationDataSub.unsubscribe();
  }

  runOneStep() {
    if (this.current_step >= this.operationData.length) {
      alert("Already finished. Will start over.")
      this.clearSteps();
      return
    }
    this.augmentationService.clearCurrentResults();
    this.augmentationService.computeAugmentation([this.current_step]);
    this.current_step += 1;
  }

  runAll() {
    let theRestIdx = []
    for (let i = this.current_step; i < this.operationData.length; i ++) {
      theRestIdx.push(i);
    }
    this.augmentationService.clearCurrentResults();
    this.augmentationService.computeAugmentation(theRestIdx);
  }

  clearSteps() {
    this.current_step = 0;
  }
}
