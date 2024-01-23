import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadItem } from '../../../core/models/upload-item.model';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrl: './upload-item.component.scss'
})
export class UploadItemComponent {

  @Output() uploaded: EventEmitter<void> = new EventEmitter<void>;
  _file: UploadItem;
  get file(): UploadItem {
    return this._file;
  }
  @Input() set file(value: UploadItem) {
    this._file = value;
    setTimeout(() => {
      this.file.isUploaded = true;
      this.uploaded.emit();
    }, Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000); // Random from 1s to 4s
  }
}
