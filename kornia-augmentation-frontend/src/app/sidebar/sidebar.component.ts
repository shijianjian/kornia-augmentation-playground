import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AugmentationService } from '../augmentation.service';
import { OperationDataService } from '../data/operation-data.service';
import { KorniaFormDataControl } from '../data/utils';

@Component({
  selector: 'kornia-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() hidden;

  codes: string = "";
  codes_sub: Subscription;
  image: Blob;
  image_sub: Subscription;
  in_computing: boolean;
  in_computing_sub: Subscription;

  isDisplayingCode = false;
  showImageUploader = true;
  operationType: string = 'Aug';

  operationData: KorniaFormDataControl[] = [];

  constructor(
    private augmentationService: AugmentationService,
    private operationDataService: OperationDataService
  ) { }

  ngOnInit() {
    this.codes_sub = this.augmentationService.codes.subscribe(data => this.codes = data['code']);
    this.image_sub = this.augmentationService.image.subscribe(img => this.image = img);
    this.in_computing_sub = this.augmentationService.in_computing.subscribe(data => this.in_computing = data);
    this.operationDataService.operationData.pipe(take(1)).subscribe(data => {this.operationData = data['2D']})
  }

  ngOnDestroy() {
    this.codes_sub.unsubscribe();
    this.image_sub.unsubscribe();
    this.in_computing_sub.unsubscribe();
  }

  onGetCode() {
    if (!this.isDisplayingCode) {
      this.augmentationService.getAugmentationCode();
    }
    this.isDisplayingCode = !this.isDisplayingCode;
  }

  onGetModel() {

  }

  onClearAll() {
    if (confirm("You are going to delete all operations.")) {
      this.operationData = [];
      this.augmentationService.clearCurrentResults();
    }
  }

  onOperationTypeChanged(event) {
    this.operationDataService.updateOperationDataByKey(event);
    this.operationType = event;
  }

  onOperationDataChanged(event) {
    this.operationDataService.saveCurrentOperationData(this.operationType, event);
    this.augmentationService.korniaFormData.next(event);
    this.operationData = event;
  }

  onImageBarClicked() {
    this.showImageUploader = !this.showImageUploader
  }

}
