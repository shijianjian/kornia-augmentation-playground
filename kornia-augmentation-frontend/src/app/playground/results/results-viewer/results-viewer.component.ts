import { Component, Input } from '@angular/core';
import { AugmentationService } from 'src/app/augmentation.service';


@Component({
  selector: 'kornia-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.css']
})
export class ResultsViewerComponent {

  @Input() image;
  @Input() param;

  showPipeline = false;

  constructor(
    private augmentationService: AugmentationService
  ) { }

  onCheckPipeline() {
    this.showPipeline = !this.showPipeline;
  }

  onSendToImage() {
    this.augmentationService.sendBase64AsImage(this.image);
  }

}
