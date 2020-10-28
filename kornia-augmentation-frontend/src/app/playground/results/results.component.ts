import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  image_to_view;
  param_to_view;

  private augmentationServiceSub: Subscription;
  images;
  params;
  wrap = false;
  imageSelected = undefined;

  @Input() set computing(value) {
    if (value) {
      this.imageSelected = undefined;
    }
  }

  constructor(private augmentationService: AugmentationService) { }

  ngOnInit() {
    this.augmentationServiceSub = this.augmentationService.results.subscribe(res => {
      this.images = res['images'];
      this.params = res['params'];
      this.imageSelected = undefined;
    });
  }

  ngOnDestroy() {
    this.augmentationServiceSub.unsubscribe();
  }

  onWrapping() {
    this.wrap = !this.wrap;
  }

  onImageClicked(event) {
    this.imageSelected = event;
    this.image_to_view = this.getImageByIndex(event);
    this.param_to_view = this.getParamByIndex(event);
    console.log(this.param_to_view)
  }

  getImageByIndex(idx) {
    return this.images[idx];
  }

  getParamByIndex(idx) {
    if (Object.keys(this.params).length == 0) {
      return {};
    }
    return this.params[idx];
  }

}
