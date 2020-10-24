
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

  private _formData;
  public get formData() { return this._formData; }
  public set formData(val) { this._formData = val; }

  results = new BehaviorSubject<object>([])
  codes = new BehaviorSubject<object>({code: ''})

  computeAugmentation(step_list) {
    if (this._image == undefined || this._formData == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    let data = []
    for (let i=0; i < step_list.length; i ++) {
      data.push(this.formData[step_list[i]]);
    }
    // alert(this.image.name + JSON.stringify(data));
    this._computeAugmentationByServer(data);
  }

  private _computeAugmentationByServer(data) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this._image)
    fileReader.onload = () => {
        const formData = new FormData();  
        formData.append('file', this.image); 
        formData.append('setting', JSON.stringify(data)); 
        this.http.post("http://localhost:7000/augmentation/compute", formData).subscribe(data => {
          this.results.next(data);
        });
     }
  }

  private _computeAugmentationByONNX() {
    
  }

  getAugmentationCode() {
    if (this._image == undefined || this._formData == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    const formData = new FormData();
    formData.append('file', null); 
    formData.append('setting', JSON.stringify(this._formData)); 
    this.http.post("http://localhost:7000/augmentation/getcode", formData).subscribe(data => {
      console.log(data['code'])
      this.codes.next(data);
    });
  }

}