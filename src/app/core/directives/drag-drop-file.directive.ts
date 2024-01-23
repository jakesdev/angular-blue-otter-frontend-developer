import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  @Output() isError: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('style.border') private border = '1px dashed #bcbebe';

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    let files: FileHandle[] = [];
    if (evt.dataTransfer) {
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        if (!this.isAllowedFileType(evt.dataTransfer.files[i].name)) {
          this.isError.emit();
          return
        }

        const file = evt.dataTransfer.files[i];
        const url = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
        files.push({ file, url });
      }
      if (files.length > 0) {
        this.files.emit(files);
      }
    }

  }

  isAllowedFileType(fileName: string): boolean {
    const allowedExtensionsRegex = /\.(jpg|jpeg|png|heic|gif)$/i;
    return allowedExtensionsRegex.test(fileName);
  }
}
