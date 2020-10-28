import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatTooltipModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { KorniaCommonModule } from "../../../kornia-common/kornia-common.module";
import { OperationItemComponent } from './operation-item.component';
import { KorniaPipesModule } from 'src/app/pipes/kornia-pipes.module';


@NgModule({
  declarations: [
    OperationItemComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    KorniaCommonModule,
    KorniaPipesModule
  ],
  exports: [
    OperationItemComponent
  ],
})
export class OperationItemModule { }
