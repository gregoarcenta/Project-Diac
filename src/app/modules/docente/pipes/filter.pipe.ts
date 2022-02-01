import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    const resultadoDocente = [];
    for (const docente of value) {
      if (docente.nameTeacher.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoDocente.push(docente);
      };
    };
    return resultadoDocente;
  }

}
