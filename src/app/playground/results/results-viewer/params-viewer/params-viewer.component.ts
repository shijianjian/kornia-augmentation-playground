import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kornia-params-viewer',
  templateUrl: './params-viewer.component.html',
  styleUrls: ['./params-viewer.component.css']
})
export class ParamsViewerComponent implements OnInit {

  private augnames;
  private _params;
  showDetails = true;

  @Input() set params(value: object[]) {
    this._params = value;
    this.augnames = this.getKeys(value);
  }

  get params() {
    return this._params;
  }

  constructor() { }

  ngOnInit() {
  }

  getKeys(value: object[]) {
    return Object.keys(value);
  }

  onToggle() {
    this.showDetails = !this.showDetails;
  }

}
