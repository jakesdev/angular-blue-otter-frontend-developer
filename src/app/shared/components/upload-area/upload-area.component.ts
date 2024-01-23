import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FileHandle } from '../../../core/directives/drag-drop-file.directive';
import { UploadService } from '../../../core/services/upload.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-area',
  templateUrl: './upload-area.component.html',
  styleUrl: './upload-area.component.scss'
})
export class UploadAreaComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>;
  constructor(private uploadService: UploadService, private sanitizer: DomSanitizer) {
  }
  filesDropped(files: FileHandle[]) {
    this.uploadService.onUploadFiles(files);
  }

  selectFile($event: any) {
    const file = $event.target.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
    );
    const fileHandle: FileHandle = {
      file, url
    }
    this.uploadService.onUploadFiles([fileHandle]);
  }

  uploadMore() {
    document.getElementById('uploader')?.click();
  }

  close() {
    this.onClose.emit();
  }
}
