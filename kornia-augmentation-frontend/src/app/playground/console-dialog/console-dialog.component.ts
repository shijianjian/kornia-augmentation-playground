import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'kornia-console-dialog',
  templateUrl: './console-dialog.component.html',
  styleUrls: ['./console-dialog.component.css']
})
export class ConsoleDialogComponent implements OnInit {

  batchsizes = [8, 16, 32]
  devices = ['CPU', 'GPU', 'TPU'];
  dtypes = ['float16', 'float32', 'float64'];
  batchsize = 8;
  device = 'CPU';
  dtype = 'float32';

  constructor(private configService: ConfigService,) { }

  ngOnInit() {
    this.configService.getAvaliableDevices().subscribe(data => {
      this.devices = data['devices'];
      this.device = this.configService.device.getValue();
    });
    this.configService.getAvaliableDtypes().subscribe(data => {
      this.dtypes = data['dtypes'];
      this.dtype = this.configService.dtype.getValue();
    });
    this.configService.getBatchSizes().subscribe(data => {
      this.batchsizes = data['batchsizes'];
      this.batchsize = this.configService.batchsize.getValue();
    });
  }

  onDeviceChanged(event: string) {
    this.configService.device.next(event);
  }

  onDtypeChanged(event: string) {
    this.configService.dtype.next(event);
  }
  onBatchsizeChanged(event: number) {
    this.configService.batchsize.next(event);
  }

}
