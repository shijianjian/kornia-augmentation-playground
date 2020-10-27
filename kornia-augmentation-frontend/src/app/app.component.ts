import { Component, OnDestroy, OnInit } from '@angular/core';
import { AugmentationService } from './augmentation.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sample';
  hidden = false;

  in_computing: boolean;
  in_computing_sub: Subscription;

  constructor(
    private augmentationService: AugmentationService
  ) { }

  ngOnInit() {
    this.in_computing_sub = this.augmentationService.in_computing.subscribe(data => this.in_computing = data);
  }

  ngOnDestroy() {
    this.in_computing_sub.unsubscribe();
  }
  onHidden() {
    this.hidden = !this.hidden
  }
}
