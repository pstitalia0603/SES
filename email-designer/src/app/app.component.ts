import { Component, HostListener, ViewChild } from '@angular/core';
import { templates } from './sampleTemplates';
import { TemplateBean } from './templateBean';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesUploadComponent } from './images-upload/images-upload.component';
import { EmailEditorComponent } from '@send-with-ses/ng-email-designer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'email-designer';

  @ViewChild('emailEditor') emailEditor!: EmailEditorComponent;

  templatesList: any[] = [];
  selectedTemplate!: TemplateBean;
  selectedTemplateType = '';

  /* choose one or more template types  */
  templateTypes: any[] = [
    { type: 'ses_designer', name: 'SENDUNE Designer' },
    { type: 'html_editor', name: 'HTML Editor' },
    { type: 'plain_text', name: 'Plain Text' },
  ];

  /* Include these for responsive layout  */
  mobileView: any = false;
  windowResizeWidth: boolean = false;

  windowSmallWidth = 600; //  tablets and smaller devices
  windowLargeWidth = 1200; //  larger screens
  showSlidebar = false; // showSlidebar in smaller devices

  constructor(private modalService: NgbModal) {
    this.initialData(); // Initialize Data
  }

  ngOnInit() {
    /* Detects and renders responsive layout for smaller devices */
    this.detectMobileView();
    if (!this.mobileView) {
      this.closeSideNav();
    }
  }

  initialData() {
    /* predefined list of templates */
    this.templatesList = templates;

    /* REQUIRED - Put initial value for the selectedTemplateType */
    this.selectedTemplateType = 'ses_designer';

    /* REQUIRED - Put initial data for the selectedTemplate */
    this.selectedTemplate = this.templatesList[0];
  }

  /* To get the HTML output of the template */
  exportHtml() {
    this.emailEditor.showHtmlPreview();
  }

  /* preview your template */
  preview() {
    this.emailEditor.showPreview();
  }

  /* to switch to different template type */
  typeSelected(type: string) {
    this.selectedTemplateType = type;
    this.templatesList.forEach((template: TemplateBean) => {
      if (template.type === type) {
        this.selectedTemplate = template;
      }
    });
  }

  /* Triggers when you change content */
  onEmailContentChange(content: any) {
    this.templatesList.forEach((template: TemplateBean) => {
      if (
        template.type === this.selectedTemplateType &&
        template.type !== 'ses_designer'
      ) {
        template.content = content.content;
      }
    });
  }

  /* select image from image repository */
  onImageSelectionTrigger(blockData: any) {
    /* assign response data for selected image */
    const modalRef = this.modalService.open(ImagesUploadComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.isMobileView = this.mobileView;

    const imageOptions = {
      width: blockData.width,
      src: blockData.src,
      originalWidth: blockData.logo ? blockData.originalWidth : '',
    };
    this.emailEditor.imageSelected(imageOptions, blockData);
  }

  /* Triggered when footer brand icons are changed ..  */
  onImageUploadTrigger(data: any) {
    /* assign response data for selected brand icon */
    this.emailEditor.imageSelected({ width: data.width, src: data.url }, data);
  }

  /* Images can be directly uploaded to a cloud storage of your choice (ex: AWS S3, Cloudflare R2, GCP Cloud Storage etc). */
  uploadImage(isLogo = false) {
    /* upload images */
    const modalRef = this.modalService.open(ImagesUploadComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.imageNotClick = true;
    /* assign this fo smaller views */
    modalRef.componentInstance.isMobileView = this.mobileView;
    modalRef.closed.subscribe((data: any) => {
      if (data) {
        if (isLogo) {
          /* assign the response image data to logo */
        } else {
          /*  assign the response image data to selected image block */
        }
      }
    });
  }

  /* Ensures the layout adapts immediately when the window resizes */
  @HostListener('window:resize')
  onWindowResize(): void {
    this.detectMobileView();
  }

  /* detects smaller devices & window resizes */
  detectMobileView(): void {
    const windowWidth = window.innerWidth;
    this.mobileView =
      windowWidth <= this.windowSmallWidth ||
      /Mobi|Android/i.test(navigator.userAgent) ||
      /iPhone/i.test(navigator.userAgent)
        ? true
        : false;
    this.windowResizeWidth = window.innerWidth <= this.windowLargeWidth;
  }

  closeSideNav() {
    this.showSlidebar = false;
  }

  openSideNav() {
    this.showSlidebar = true;
    this.emailEditor.openOffcanvas(this.showSlidebar);
  }
}
