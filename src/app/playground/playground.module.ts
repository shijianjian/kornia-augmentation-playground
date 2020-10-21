import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PlatformComponent } from './platform/platform.component';
import { AugmentationListModule } from './augmentation-list/augmentation-list.module';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    PlatformComponent,
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDropzoneModule,
    AugmentationListModule,
    MatIconModule,
  ],
  exports: [
    PlatformComponent
  ]
})
export class KorniaPlaygroundModule { }
