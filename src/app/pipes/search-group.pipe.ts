import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchGroup',
  standalone: true
})
export class SearchGroupPipe implements PipeTransform {

  transform(groups: any[], searchTerm: string): any[] {
    if (!groups || !searchTerm) {
      return groups;
    }
    
    return groups.filter(group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
