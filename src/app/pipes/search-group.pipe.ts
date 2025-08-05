import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchGroup'
})
export class SearchGroupPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
