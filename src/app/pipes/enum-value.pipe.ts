import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue'
})
export class EnumValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
