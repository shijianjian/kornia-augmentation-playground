import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleDialogComponent } from './console-dialog.component';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsoleDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule
  ],
  entryComponents: [ConsoleDialogComponent],
  exports: [ConsoleDialogComponent]
})
export class ConsoleDialogModule { }
