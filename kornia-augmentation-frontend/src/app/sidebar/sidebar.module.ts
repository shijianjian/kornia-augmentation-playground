import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule, MatTooltipModule, MatToolbarModule, MatRadioModule } from '@angular/material';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { OperationListModule } from './operation-list/operation-list.module';
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
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    OperationListModule,
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
