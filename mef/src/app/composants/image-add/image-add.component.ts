import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImage } from 'src/app/models/uploadImage';
import { MembreService } from 'src/app/services/membre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.scss'],
})
export class ImageAddComponent implements OnInit {
  @Input()
  photo: string = '';
  @Output()
  photoChange = new EventEmitter<string>();
  fichier: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('closeModal') modalClose: any;

  constructor(private membreService: MembreService) {}

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  selectionner(): void {
    this.photoChange.emit(this.croppedImage);
    this.modalClose.nativeElement.click();
  }
}
