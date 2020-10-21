import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'kornia-augmentation-list',
  templateUrl: './augmentation-list.component.html',
  styleUrls: ['./augmentation-list.component.css']
})
export class AugmentationListComponent implements OnInit {

  movies = [
    'RandomHorizontalFlip',
    'RandomVerticalFlip',
    'RandomRotation',
    'RandomAffine',
    'RandomPerspective',
    'RandomErasing',
    'CenterCrop',
    'RandomCrop',
    'RandomResizedCrop',
    'RandomMotionBlur',
    'ColorJitter',
    'RandomGrayscale',
    'RandomSolarize',
    'RandomPosterize',
    'RandomEqualize',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }


  constructor() { }

  ngOnInit() {
  }

}
