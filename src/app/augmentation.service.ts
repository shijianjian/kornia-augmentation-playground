
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AugmentationService {

  constructor(private http: HttpClient) {}

  results = new BehaviorSubject<object>({images: [], params: []});
  codes = new BehaviorSubject<object>({code: ''});
  image = new BehaviorSubject<Blob>(undefined);
  formData = new BehaviorSubject<object[]>([]);

  computeAugmentation(step_list) {
    if (this.image.getValue() == undefined || this.formData.getValue() == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    let data = []
    for (let i=0; i < step_list.length; i ++) {
      data.push(this.formData.getValue()[step_list[i]]);
    }
    // alert(this.image.name + JSON.stringify(data));
    this._computeAugmentationByServer(data);
  }

  private _computeAugmentationByServer(data) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this.image.getValue())
    fileReader.onload = () => {
        const formData = new FormData();  
        formData.append('file', this.image.getValue()); 
        formData.append('setting', JSON.stringify(data)); 
        this.http.post("http://localhost:7000/augmentation/compute", formData).subscribe(data => {
          this.results.next(data);
        });
     }
  }

  private _computeAugmentationByONNX() {
    
  }

  getAugmentationCode() {
    if (this.image.getValue() == undefined || this.formData.getValue() == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    const formData = new FormData();
    formData.append('file', null); 
    formData.append('setting', JSON.stringify(this.formData.getValue())); 
    this.http.post("http://localhost:7000/augmentation/getcode", formData).subscribe(data => {
      console.log(data['code'])
      this.codes.next(data);
    });
  }


  clearCurrentResults() {
    this.results.next({images: [], params: []});
  }
}