import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { KorniaCommonModule } from "../../../kornia-common/kornia-common.module";
import { AugmentationItemComponent } from './augmentation-item.component';


@NgModule({
  declarations: [
    AugmentationItemComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    KorniaCommonModule
  ],
  exports: [
    AugmentationItemComponent
  ],
})
export class AugmentationItemModule { }
