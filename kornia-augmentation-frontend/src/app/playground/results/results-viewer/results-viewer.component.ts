import { Component, Input } from '@angular/core';


@Component({
  selector: 'kornia-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.css']
})
export class ResultsViewerComponent {

  @Input() image;
  @Input() param;

  showPipeline = false;

  constructor() { }

  onCheckPipeline() {
    this.showPipeline = !this.showPipeline;
  }

}
