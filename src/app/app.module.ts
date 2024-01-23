import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadItemComponent } from './shared/components/upload-item/upload-item.component';
import { UploadService } from './core/services/upload.service';
import { DragDirective } from './core/directives/drag-drop-file.directive';
import { UploadAreaComponent } from './shared/components/upload-area/upload-area.component';
import { UploadingAreaComponent } from './shared/components/uploading-area/uploading-area.component';
import { FileSizePipe } from './core/pipes/file-size.pipe';


const directive = [
  DragDirective
];

const pipes = [
  FileSizePipe
]
const components = [
  UploadItemComponent,
  UploadAreaComponent,
  UploadingAreaComponent
]
@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...directive,
    ...pipes,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
