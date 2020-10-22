import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule, MatSidenavModule } from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AugmentationListModule } from './augmentation-list/augmentation-list.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatIconModule,
    MatSidenavModule,
    AugmentationListModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
