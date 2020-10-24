import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule, MatSidenavModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AugmentationListModule } from './augmentation-list/augmentation-list.module';
import { SidebarComponent } from './sidebar.component';
import { AugmentationService } from '../augmentation.service';
import { IconSideBarModule } from './icon-side-bar/icon-side-bar.module';

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
    MatTooltipModule,
    MatToolbarModule,
    AugmentationListModule,
    IconSideBarModule,
  ],
  providers: [
    AugmentationService
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
