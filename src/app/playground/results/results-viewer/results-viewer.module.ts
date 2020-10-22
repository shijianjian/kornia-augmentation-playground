import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsViewerComponent } from './results-viewer.component';

@NgModule({
  declarations: [
    ResultsViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResultsViewerComponent
  ]
})
export class ResultsViewerModule { }
