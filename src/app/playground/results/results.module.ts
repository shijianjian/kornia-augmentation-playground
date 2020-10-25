import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsThumbnailModule } from './results-thumbnail/results-thumbnail.module';
import { ResultsViewerModule } from './results-viewer/results-viewer.module';

import { ResultsComponent } from './results.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ResultsViewerModule,
    ResultsThumbnailModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule { }
