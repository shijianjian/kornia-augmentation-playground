import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kornia-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {

  public imagePath;
  imgURL: any;
  public message: string;

  title = 'Image Zone';
  files: File[] = [];

  constructor() { }
 
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  onSelect(event) {
      this.files = event.addedFiles
      this.preview(this.files)
  }

  onRemove(event) {
      console.log(event);
      this.files = [];
      this.imgURL = undefined;
  }

}
