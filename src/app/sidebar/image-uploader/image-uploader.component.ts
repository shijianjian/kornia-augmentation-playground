import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { AugmentationService } from 'src/app/augmentation.service';

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

  constructor(private augmentationService: AugmentationService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/DefaultImage.png', { responseType: 'blob' })
        .pipe(take(1))
        .subscribe(data => {
          var file = new File([data], 'DefaultImage.png', {type:"image/png"});
          this.processing([file]);
        });
  }
 
  processing(files) {
    if (!this.inputCheck(files)) { return }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.augmentationService.image.next(files[0]);
  }

  onSelect(event) {
      this.processing(event.addedFiles);
  }

  onRemove(event) {
      console.log(event);
      this.imgURL = undefined;
      this.augmentationService.image.next(undefined);
  }

  private inputCheck(files) {
    if (files.length === 0) { return false; }
    const maxAllowedSize = 2;
    var mimeType = files[0].type;
    var size = files[0].size;
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
