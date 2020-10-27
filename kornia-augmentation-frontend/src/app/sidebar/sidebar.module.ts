import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AugmentationListModule } from './augmentation-list/augmentation-list.module';
import { SidebarComponent } from './sidebar.component';
import { AugmentationService } from '../augmentation.service';
import { IconSideBarModule } from './icon-side-bar/icon-side-bar.module';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';
import { ActionAreaModule } from './action-area/action-area.module';

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
    MatButtonModule,
    AugmentationListModule,
    IconSideBarModule,
    ImageUploaderModule,
    ActionAreaModule
  ],
  providers: [
    AugmentationService
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
