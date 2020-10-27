import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit, OnDestroy {

  public imagePath;
  imgURL: any;
  public message: string;

  private imageSub: Subscription;

  title = 'Image Zone';

  constructor(private augmentationService: AugmentationService) { }

  ngOnInit() {
    this.imageSub = this.augmentationService.image.subscribe(data => {
      this.showImage(data);
    });
  }
 
  ngOnDestroy() {
    this.imageSub.unsubscribe()
  }

  showImage(file) {
    if (!this.inputCheck(file)) { return }
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  onSelect(event) {
    if (!this.inputCheck(event.addedFiles[0])) { return }
    this.augmentationService.image.next(event.addedFiles[0]);
  }

  onRemove(event) {
    this.imgURL = undefined;
    this.augmentationService.image.next(undefined);
  }

  private inputCheck(file) {
    if (file == undefined) { return; }
    const maxAllowedSize = 2;
    var mimeType = file.type;
    var size = file.size;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return false;
    }
    if (size > maxAllowedSize * 1024 * 1024) {
      // Here you can ask your users to load correct file
       alert(`Image bigger than ${maxAllowedSize} MB is not allowed.`);
       return false
    }
    return true
  }

}
