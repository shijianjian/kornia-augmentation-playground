import { Component, Input } from '@angular/core';


@Component({
  selector: 'kornia-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.css']
})
export class ResultsViewerComponent {

  @Input() images;
  @Input() params;
  @Input() index;

  showPipeline = false;

  constructor() { }

  onCheckPipeline() {
    this.showPipeline = !this.showPipeline;
  }

}
