import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PlaygroundComponent } from './playground.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ResultsModule } from './results/results.module';

@NgModule({
  declarations: [
    PlaygroundComponent,
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatIconModule,
    ResultsModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class KorniaPlaygroundModule { }
