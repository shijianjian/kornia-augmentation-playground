import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AugmentationService } from '../augmentation.service';

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

  augmentationData = [];
  augmentationList = [];
  private augmentationList2D = [
    {name: 'RandomHorizontalFlip', kwargs: {p: 0.5}},
    {name: 'RandomVerticalFlip', kwargs: {p: 0.5}},
    {name: 'ColorJitter', kwargs: {p: 0.5}},
  ];
  private augmentationList3D = []

  constructor(
    private augmentationService: AugmentationService
  ) { }

  ngOnInit() {
    this.augmentationList = this.augmentationList2D;
    this.codes_sub = this.augmentationService.codes.subscribe(data => this.codes = data['code']);
    this.image_sub = this.augmentationService.image.subscribe(img => this.image = img);
    this.in_computing_sub = this.augmentationService.in_computing.subscribe(data => this.in_computing = data);
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
      this.augmentationList = [];
      this.augmentationService.clearCurrentResults();
    }
  }

  onItemChanged(event) {
    if (event == 'Aug') {
      this.augmentationList = this.augmentationList2D;
    } else if (event == 'CV') {
      this.augmentationList = this.augmentationList3D;
    } else {
      console.error(`${event} is not implemented.`)
    }
    this.operationType = event;
  }

  onAugmentationChanged(event) {
    this.augmentationData = event;
    if (this.operationType == 'Aug') {
      this.augmentationList2D = this.augmentationData;
    } else if (this.operationType == 'CV') {
      this.augmentationList3D = this.augmentationData;
    } else {
      console.error(`${this.operationType} is not implemented.`)
    }
    this.augmentationService.formData.next(this.augmentationData);
  }

  onImageBarClicked() {
    this.showImageUploader = !this.showImageUploader
  }
}
