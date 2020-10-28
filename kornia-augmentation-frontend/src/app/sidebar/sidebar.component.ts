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

  image: Blob;
  image_sub: Subscription;
  in_computing: boolean;
  in_computing_sub: Subscription;

  showImageUploader = true;
  operationType: string = 'Aug';

  operationData: KorniaFormDataControl[] = [];
  operationData_sub: Subscription;

  constructor(
    private augmentationService: AugmentationService,
    private operationDataService: OperationDataService
  ) { }

  ngOnInit() {
    this.image_sub = this.augmentationService.image.subscribe(img => this.image = img);
    this.in_computing_sub = this.augmentationService.in_computing.subscribe(data => this.in_computing = data);
    this.operationData_sub = this.operationDataService.operationData.subscribe(data => this.operationData = data['2D']);
  }

  ngOnDestroy() {
    this.image_sub.unsubscribe();
    this.in_computing_sub.unsubscribe();
    this.operationData_sub.unsubscribe()
  }

  onImageBarClicked() {
    this.showImageUploader = !this.showImageUploader
  }

}
