import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsViewerComponent } from './results-viewer.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    ResultsViewerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ResultsViewerComponent
  ]
})
export class ResultsViewerModule { }
