import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatToolbarModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PlaygroundComponent } from './playground.component';
import { ResultsModule } from './results/results.module';
import { ConsoleDialogModule } from './console-dialog/console-dialog.module';

@NgModule({
  declarations: [
    PlaygroundComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    ResultsModule,
    ConsoleDialogModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class KorniaPlaygroundModule { }
