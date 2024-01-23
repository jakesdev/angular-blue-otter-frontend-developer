import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000) {
      const formattedValue = (value / 1000).toFixed(1);
      return `${formattedValue}K`;
    } else {
      return value.toString();
    }
  }
}
