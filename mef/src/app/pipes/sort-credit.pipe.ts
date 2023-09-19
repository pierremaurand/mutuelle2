import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCredit',
})
export class SortCreditPipe implements PipeTransform {
  transform(value: Array<any>, args: any[]): any {
    const sortDirection = args[0];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    if (value) {
      value.sort((a: any, b: any) => {
        if (a['membre']['nom'] < b['membre']['nom']) {
          return -1 * multiplier;
        } else if (a['membre']['nom'] > b['membre']['nom']) {
          return 1 * multiplier;
        } else {
          return 0;
        }
      });

      return value;
    }
  }
}
