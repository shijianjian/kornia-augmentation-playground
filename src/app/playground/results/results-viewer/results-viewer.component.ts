import { Component, Input } from '@angular/core';


@Component({
  selector: 'kornia-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.css']
})
export class ResultsViewerComponent {

  @Input() images;
  @Input() params;

  constructor() { }

}
