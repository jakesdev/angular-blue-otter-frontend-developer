import { SafeUrl } from "@angular/platform-browser";

export class UploadItem {
  fileName: string;
  fileSize: number;
  url: SafeUrl;

  // for UI
  isUploaded?: boolean;

  constructor(init?: Partial<UploadItem>) {
    Object.assign(this, init);
  }
}
