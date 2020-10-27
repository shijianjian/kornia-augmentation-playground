
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from "src/environments/environment";
import { object_remove_suffix } from "src/app/data/utils";

@Injectable({
  providedIn: 'root'
})
export class AugmentationService{

  constructor(private http: HttpClient) {
    this.http.get('assets/DefaultImage.png', { responseType: 'blob' })
      .pipe(take(1))
      .subscribe(data => {
        var file = new File([data], 'DefaultImage.png', {type:"image/png"});
        this.image.next(file);
      });
  }

  results = new BehaviorSubject<object>({images: [], params: []});
  codes = new BehaviorSubject<object>({code: ''});
  image = new BehaviorSubject<Blob>(undefined);
  in_computing = new BehaviorSubject<boolean>(false);
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
    this.in_computing.next(true);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this.image.getValue())
    fileReader.onload = () => {
        const formData = new FormData(); 
        formData.append('file', null);
        let _data = data.map((val) => {
          return {
            name: val['name'],
            kwargs: object_remove_suffix(val['kwargs'])
          }
        }); 
        formData.append('file', this.image.getValue()); 
        formData.append('setting', JSON.stringify(_data)); 
        this.http.post(`${environment.apiURL}/augmentation/compute`, formData).pipe(take(1)).subscribe(data => {
          this.results.next(data);
          this.in_computing.next(false);
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
    let data = this.formData.getValue().map((val) => {
      return {
        name: val['name'],
        kwargs: object_remove_suffix(val['kwargs'])
      }
    });
    console.log(data)
    formData.append('setting', JSON.stringify(data)); 
    this.http.post(`${environment.apiURL}/augmentation/getcode`, formData).pipe(take(1)).subscribe(data => {
      console.log(data['code'])
      this.codes.next(data);
    });
  }


  clearCurrentResults() {
    this.results.next({images: [], params: []});
  }
}