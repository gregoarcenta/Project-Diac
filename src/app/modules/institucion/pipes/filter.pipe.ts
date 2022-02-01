import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    const resultadoInstitucion = [];
    for (const institucion of value) {
      if (institucion.nameInstitution.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoInstitucion.push(institucion);
      };
    };
    return resultadoInstitucion;
  }

}
