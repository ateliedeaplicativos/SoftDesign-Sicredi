import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySort'
})
export class ArraySortPipe implements PipeTransform {

  transform(arrayToSort: any, field: string): Array<any> {
    if (!Array.isArray(arrayToSort)) {
      return [];
    }
    arrayToSort.sort((a: any, b: any) => {
      if((a[field]).toUpperCase() < b[field].toUpperCase()) {
        return -1;
      }
      if(a[field].toUpperCase() > b[field].toUpperCase()) {
        return 1;
      }
      return 0;

    });
    return arrayToSort;
  }

}
