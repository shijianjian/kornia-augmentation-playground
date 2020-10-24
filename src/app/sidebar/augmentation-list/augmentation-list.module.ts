import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AugmentationItemModule } from './augmentation-item/augmentation-item.module';
import { AugmentationListComponent } from './augmentation-list.component';
import { MatChipsModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AugmentationListComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatChipsModule,
    MatIconModule,
    AugmentationItemModule
  ],
  exports: [
    AugmentationListComponent
  ]
})
export class AugmentationListModule { }
