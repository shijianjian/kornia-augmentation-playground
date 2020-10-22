
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // alert(this.image.name + JSON.stringify(this.setting));
    this._computeAugmentationByServer()
  }

  private _computeAugmentationByServer() {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this._image)
    fileReader.onload = () => {
        const formData = new FormData();  
        formData.append('file', this.image); 
        formData.append('setting', JSON.stringify(this.setting)); 
        this.http.post("http://localhost:7000/augmentation/compute", formData).subscribe(data => {
          this.results.next(data);
        })
     }
  }

  private _computeAugmentationByONNX() {
    
  }
}