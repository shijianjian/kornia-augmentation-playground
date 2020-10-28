import { Component, Input, OnInit } from '@angular/core';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-params-viewer',
  templateUrl: './params-viewer.component.html',
  styleUrls: ['./params-viewer.component.css']
})
export class ParamsViewerComponent implements OnInit {

  private augnames: string[];
  private _params;
  showDetails = true;

  @Input() set params(value: object[]) {
    this._params = value;
    this.augnames = [];
    this.augmentationService.korniaFormData.getValue().forEach(ele => {
      if (value[ele.name] != undefined) {
        this.augnames.push(ele.name);
        console.log(this.augnames)
      }
    })
  }

  get params() {
    return this._params;
  }

  constructor(
    private augmentationService: AugmentationService
  ) { }

  ngOnInit() {
  }

  getKeys(value: object[]) {
    return Object.keys(value);
  }

  onToggle() {
    this.showDetails = !this.showDetails;
  }

}
