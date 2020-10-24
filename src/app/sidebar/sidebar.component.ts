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
  isDisplayingCode = false;

  augmentationListName = '2D';

  constructor(private augmentationService: AugmentationService) {
  }

  ngOnInit() {
    this.codes_sub = this.augmentationService.codes.subscribe(data => {
      this.codes = data['code'];
    });
  }

  ngOnDestroy() {
    this.codes_sub.unsubscribe()
  }

  onGetCode() {
    this.augmentationService.getAugmentationCode();
    this.isDisplayingCode = !this.isDisplayingCode;
  }

  onGetModel() {

  }

  onItemChanged(event) {
    this.augmentationListName = event;
  }

}
