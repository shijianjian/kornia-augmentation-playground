import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatSlideToggleModule } from '@angular/material';

import { ActionAreaComponent } from './action-area.component';

@NgModule({
  declarations: [ActionAreaComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  exports: [ActionAreaComponent]
})
export class ActionAreaModule { }
