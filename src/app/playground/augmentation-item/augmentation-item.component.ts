import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kornia-augmentation-item',
  templateUrl: './augmentation-item.component.html',
  styleUrls: ['./augmentation-item.component.css']
})
export class AugmentationItemComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
