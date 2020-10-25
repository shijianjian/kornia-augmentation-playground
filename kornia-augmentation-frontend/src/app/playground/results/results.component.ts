import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private augmentationServiceSub: Subscription;
  images;
  params;
  wrap = false;
  imageSelected = undefined;

  constructor(private augmentationService: AugmentationService) { }

  ngOnInit() {
    this.augmentationServiceSub = this.augmentationService.results.subscribe(res => {
      this.images = res['images'];
      this.params = res['params'];
      this.imageSelected = undefined;
      console.log(this.params[0])
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
  }

}
