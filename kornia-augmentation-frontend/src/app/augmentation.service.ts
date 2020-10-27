
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from "src/environments/environment";
import { KorniaFormDataControl, object_remove_suffix } from "src/app/data/utils";
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AugmentationService{

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
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
  korniaFormData = new BehaviorSubject<KorniaFormDataControl[]>([]);

  computeAugmentation(step_list: number[]) {
    if (this.image.getValue() == undefined || this.korniaFormData.getValue() == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    let data: KorniaFormDataControl[] = []
    for (let i=0; i < step_list.length; i ++) {
      data.push(this.korniaFormData.getValue()[step_list[i]]);
    }
    // alert(this.image.name + JSON.stringify(data));
    this._computeAugmentationByServer(data);
  }

  private _computeAugmentationByServer(data: KorniaFormDataControl[]) {
    console.log(data)
    this.in_computing.next(true);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this.image.getValue())
    fileReader.onload = () => {
        const _formData = new FormData(); 
        _formData.append('file', null);
        let _data = data.map((val) => {
          return {
            name: val.name,
            kwargs: object_remove_suffix(val.kwargs)
          }
        }); 
        _formData.append('file', this.image.getValue());
        _formData.append('setting', JSON.stringify(_data));
        _formData.append('device', this.configService.device.getValue());
        _formData.append('dtype', this.configService.dtype.getValue());
        _formData.append('batchsize', this.configService.batchsize.getValue().toString());
        this.http.post(`${environment.apiURL}/augmentation/compute`, _formData).pipe(take(1)).subscribe(data => {
          this.results.next(data);
          this.in_computing.next(false);
        }, err => {
          alert(`Operation failed: ${JSON.stringify(err)}`);
          this.in_computing.next(false);
        });
     }
  }

  private _computeAugmentationByONNX() {
    
  }

  getAugmentationCode() {
    if (this.image.getValue() == undefined || this.korniaFormData.getValue() == undefined) {
      alert("Image or augmentation setting is not defined")
      return
    }
    const _formData = new FormData();
    _formData.append('file', null);
    let data = this.korniaFormData.getValue().map((val) => {
      return {
        name: val['name'],
        kwargs: object_remove_suffix(val['kwargs'])
      }
    });
    _formData.append('setting', JSON.stringify(data)); 
    this.http.post(`${environment.apiURL}/augmentation/getcode`, _formData).pipe(take(1)).subscribe(data => {
      console.log(data['code'])
      this.codes.next(data);
    }, err => {
      alert(`Operation failed: ${JSON.stringify(err)}`);
      this.in_computing.next(false);
    });
  }

  clearCurrentResults() {
    this.results.next({images: [], params: []});
  }
}