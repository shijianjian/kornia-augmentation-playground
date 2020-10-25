import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatListModule, MatRadioModule } from '@angular/material';

import { IconSideBarComponent } from './icon-side-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IconSideBarComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [
    IconSideBarComponent
  ]
})
export class IconSideBarModule { }
