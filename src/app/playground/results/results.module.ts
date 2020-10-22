import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsViewerModule } from './results-viewer/results-viewer.module';

import { ResultsComponent } from './results.component';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsViewerModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule { }
