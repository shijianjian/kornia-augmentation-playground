import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AugmentationItemModule } from './augmentation-item/augmentation-item.module';
import { AugmentationListComponent } from './augmentation-list.component';

@NgModule({
  declarations: [
    AugmentationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    AugmentationItemModule
  ],
  exports: [
    AugmentationListComponent
  ]
})
export class AugmentationListModule { }
