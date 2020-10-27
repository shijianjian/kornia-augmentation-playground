
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService{

  constructor(private http: HttpClient) {}

  device = new BehaviorSubject<string>('CPU');
  dtype = new BehaviorSubject<string>('float32');
  batchsize = new BehaviorSubject<number>(8);

  getAvaliableDevices() {
    return this.http.get(`${environment.apiURL}/config/devices`, {});
  }
  getAvaliableDtypes() {
    return of({'dtypes': ['float32', 'float64']});
  }
  getBatchSizes() {
    return of({'batchsizes': [8, 16, 32]});
  }

}