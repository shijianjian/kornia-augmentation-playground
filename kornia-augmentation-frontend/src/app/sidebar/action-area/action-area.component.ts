import { Component, Input, OnInit } from '@angular/core';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-action-area',
  templateUrl: './action-area.component.html',
  styleUrls: ['./action-area.component.css']
})
export class ActionAreaComponent implements OnInit {


  current_step = 0
  isDebugMode: boolean;

  @Input() disabled: boolean;
  @Input() operationData: object[];

  constructor(
    private augmentationService: AugmentationService
  ) { }

  ngOnInit() {
  }

  runOneStep() {
    if (this.current_step >= this.operationData.length) {
      alert("Already finished. Will start over.")
      this.clearSteps();
      return
    }
    this.augmentationService.clearCurrentResults();
    this.augmentationService.computeAugmentation(this.current_step);
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
