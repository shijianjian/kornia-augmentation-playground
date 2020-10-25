import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsViewerComponent } from './results-viewer.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { ParamsViewerComponent } from './params-viewer/params-viewer.component';

@NgModule({
  declarations: [
    ResultsViewerComponent,
    ParamsViewerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  exports: [
    ResultsViewerComponent
  ]
})
export class ResultsViewerModule { }
