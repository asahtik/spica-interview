import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../classes/employee';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Employee[], terms: string[]): Employee[] {
    if(terms.length == 0) return value;
    else return value.filter(emp => {
      var noMatches = 0;
      for(var i = 0; i < terms.length; i++)
        if(`${emp.FirstName} ${emp.MiddleName} ${emp.LastName}`.toLowerCase().includes(terms[i].toLowerCase())) noMatches++;

      return noMatches >= terms.length;
    });
  }

}
