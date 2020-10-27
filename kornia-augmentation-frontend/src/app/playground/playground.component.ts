import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { AugmentationService } from '../augmentation.service';
import { ConsoleDialogComponent } from './console-dialog/console-dialog.component';

@Component({
  selector: 'kornia-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnDestroy {

  in_computing: boolean;
  in_computing_sub: Subscription;

  constructor(
    private augmentationService: AugmentationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.in_computing_sub = this.augmentationService.in_computing.subscribe(data => this.in_computing = data);
  }

  ngOnDestroy() {
    this.in_computing_sub.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConsoleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
  }
}
