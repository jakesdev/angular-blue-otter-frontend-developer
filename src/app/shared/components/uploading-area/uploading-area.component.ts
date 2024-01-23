import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { UploadService } from '../../../core/services/upload.service';
import { UploadItem } from '../../../core/models/upload-item.model';
import { Subject, takeUntil } from 'rxjs';
import { FileHandle } from '../../../core/directives/drag-drop-file.directive';

@Component({
  selector: 'app-uploading-area',
  templateUrl: './uploading-area.component.html',
  styleUrl: './uploading-area.component.scss'
})
export class UploadingAreaComponent implements OnDestroy {

  private readonly _onDestroy: Subject<void> = new Subject<void>;

  @Output() onUploadMoreClicked: EventEmitter<void> = new EventEmitter<void>;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>;

  uploadingFilesCount = 0;
  files: UploadItem[] = [];
  constructor(private uploadService: UploadService) {
    this.uploadService.uploadFiles.pipe(takeUntil(this._onDestroy)).subscribe((uploadFiles: FileHandle[]) => {
      this.uploadingFilesCount += uploadFiles.length;
      const newFiles = uploadFiles.map(item => {
        return {
          fileName: item.file.name,
          fileSize: item.file.size,
          url: item.url
        }
      });
      this.files = [...this.files, ...newFiles];
    })
  };

  onFileUploaded() {
    --this.uploadingFilesCount;
  }

  uploadMore() {
    this.onUploadMoreClicked.emit()
  }

  close() {
    this.onClose.emit();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
