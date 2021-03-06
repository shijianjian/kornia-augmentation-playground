import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { OperationItemModule } from './operation-item/operation-item.module';
import { OperationListComponent } from './operation-list.component';
import { MatButtonModule, MatChipsModule, MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    OperationListComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    OperationItemModule
  ],
  exports: [
    OperationListComponent
  ]
})
export class OperationListModule { }
