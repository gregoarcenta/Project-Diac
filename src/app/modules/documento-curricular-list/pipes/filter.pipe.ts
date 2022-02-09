import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    const resultadoitem = [];
    for (const item of value) {
      if (item.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoitem.push(item);
      };
    };
    return resultadoitem;
  }

}
