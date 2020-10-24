import { Component, OnInit, OnDestroy } from '@angular/core';

import { AugmentationService } from 'src/app/augmentation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kornia-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.css']
})
export class ResultsViewerComponent implements OnInit, OnDestroy {

  private augmentationServiceSub: Subscription;
  images;
  params;

  constructor(private augmentationService: AugmentationService) { }

  ngOnInit() {
    this.augmentationServiceSub = this.augmentationService.results.subscribe(res => {
      this.images = res['images'];
      this.params = res['params'];
      console.log(this.params[0])
    });
  }

  ngOnDestroy() {
    this.augmentationServiceSub.unsubscribe();
  }

}
