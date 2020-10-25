import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsThumbnailComponent } from './results-thumbnail.component';
import { MatCardModule, MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [
    ResultsThumbnailComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    ResultsThumbnailComponent
  ]
})
export class ResultsThumbnailModule { }
