import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    const resultArray = [];
    if (filterString === '' || propName === '') {
      return value;
    }

    for (const item of value) {
      let propo: string = item[propName].toLowerCase();
      let filtre = filterString.toLowerCase();
      if (propo.includes(filtre)) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
