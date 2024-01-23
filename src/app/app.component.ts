import { Component, ViewChild } from '@angular/core';
import { UploadService } from './core/services/upload.service';
import { FileHandle } from './core/directives/drag-drop-file.directive';
import { UploadAreaComponent } from './shared/components/upload-area/upload-area.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('uploadArea') appUploadArea: UploadAreaComponent;
  title = 'angular-blue-otter-frontend-developer';
  isShowUploadArea = true;
  isShowUploadingArea = true;



  hideUploadingArea() {
    this.isShowUploadingArea = false;
  }
  hideUploadArea() {
    this.isShowUploadArea = false;
  }

  uploadMore() {
    this.appUploadArea.uploadMore();
  }
}
