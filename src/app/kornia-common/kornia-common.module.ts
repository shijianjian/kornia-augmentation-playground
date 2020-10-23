import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatToolbarModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { HeaderComponent } from './header/header.component';
import { AutoFormComponent } from './auto-form/auto-form.component';
import { AugmentationStatusService } from '../data/augmentation-status.service';

@NgModule({
  declarations: [
    HeaderComponent,
    AutoFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    FormlyModule,
    FormlyMaterialModule
  ],
  providers: [
    AugmentationStatusService
  ],
  exports: [
    HeaderComponent,
    AutoFormComponent
  ]
})
export class KorniaCommonModule { }
