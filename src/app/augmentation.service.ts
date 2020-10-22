
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AugmentationService {

  constructor(private http: HttpClient) {}

  private _image: File;
  public get image() { return this._image; }
  public set image(val) { this._image = val; }

  private _setting;
  public get setting() { return this._setting; }
  public set setting(val) { this._setting = val; }

  results = new BehaviorSubject<object>([])

  computeAugmentation() {
    if (this._image == undefined || this._setting == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    alert(this.image.name + JSON.stringify(this.setting));
    this.results.next(["A", "B", "C"]);
  }

  private _computeAugmentationByServer() {

  }

  private _computeAugmentationByONNX() {
    
  }
}