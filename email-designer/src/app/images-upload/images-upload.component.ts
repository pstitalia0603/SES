import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.scss'],
})
export class ImagesUploadComponent {
  modal = inject(NgbActiveModal);
  @ViewChild('fileInput') fileInputElement!: ElementRef;

  faCopyIcon = ''; /* place your dersired icons */
  faUploadIcon = ''; /* place your dersired icons */
  faTrashIcon = ''; /* place your dersired icons */

  selectedTab: string = 'all';
  uploadedImages: any = [];
  loading = false;
  imagesLoaded = false;
  imageNotClick: boolean = false;
  isMobileView!: boolean;

  constructor() {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    /* fetch saved images list from your database, if any */ this.imagesLoaded = true;
  }

  deleteImage(id: string, index: any) {
    /* delete uploaded images */
  }

  copyUrl(url: any) {
    /* copy url of an image */
  }

  uploadImage(event: any) {
    let files;
    if (event instanceof DragEvent) {
      /* upload images from drag-and-drop event */
      event.preventDefault();
      files = event.dataTransfer?.files || [];
    } else {
      /* upload images from image selector */
      files = event.target.files || [];
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!this.isValidImage(file)) {
        return;
      }

      // this.loading = true;

      /* upload image to your storage (ex: AWS S3, Cloudflare R2, GCP Cloud Storage etc).  */
      // uploadImage(file)
    }

    /* reset the image input element after successful upload*/
    this.fileInputElement.nativeElement.value = '';
  }

  private isValidImage(file: File): boolean {
    if (!file) {
      return false;
    }
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSizeInMB = 2;
    const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;

    if (!allowedFormats.includes(file.type)) {
      console.error(
        `Invalid File Format '${file.type}'. Supported Image formats are PNG, JPEG, and GIF`,
        'Error'
      );
      return false;
    }

    if (file.size > maxFileSizeInKB) {
      console.error(
        `Please select an image that is ${maxFileSizeInMB}MB or less.`,
        'Try Again'
      );
      return false;
    }

    return true;
  }

  closeModal() {
    this.modal.dismiss();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.uploadImage(event);
  }
  selectImage(selectedImage: any): void {
    /* logic for selecting the image and adding to image block */
    const { url, type, thumbnailUrl, ...filteredData } = selectedImage;
    const originalWidth = selectedImage.originalWidth ?? selectedImage.width;
    const imageData = { ...filteredData, src: url, originalWidth };
    this.modal.close(imageData);
  }
}
