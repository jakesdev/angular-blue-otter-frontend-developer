import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UploadItem } from '../models/upload-item.model';
import { FileHandle } from '../directives/drag-drop-file.directive';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadFiles$: BehaviorSubject<FileHandle[]> = new BehaviorSubject<FileHandle[]>([]);
  get uploadFiles() { return this.uploadFiles$.asObservable() }
  constructor() { }

  onUploadFiles(files: FileHandle[]) {
    this.uploadFiles$.next(files)
  }

}
