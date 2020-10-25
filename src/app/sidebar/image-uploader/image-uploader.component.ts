import { Component, OnInit } from '@angular/core';
import { AugmentationService } from 'src/app/augmentation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kornia-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;

  title = 'Image Zone';
  files: File[] = [];

  constructor(private augmentationService: AugmentationService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/DefaultImage.png', { responseType: 'blob' })
        .subscribe(data => {
          var file = new File([data], 'DefaultImage.png', {type:"image/png"});
          this.preview([file]);
          this.augmentationService.image.next(file);
        });
  }
 
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
      this.augmentationService.image.next(this.files[0]);
  }

  onRemove(event) {
      console.log(event);
      this.files = [];
      this.imgURL = undefined;
      this.augmentationService.image.next(undefined);
  }

}
