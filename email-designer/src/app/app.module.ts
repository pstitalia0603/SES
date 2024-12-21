import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmailEditorModule } from '@send-with-ses/ng-email-designer';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ImagesUploadComponent } from './images-upload/images-upload.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    EmailEditorModule,
    MonacoEditorModule.forRoot(), // import this for HTML editor
  ],
  declarations: [AppComponent, ImagesUploadComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
