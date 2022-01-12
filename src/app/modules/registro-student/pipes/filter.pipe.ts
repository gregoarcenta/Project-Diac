import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    const resultadoEstudiante = [];
    for (const estudiante of value) {
      if (estudiante.nameStudent.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoEstudiante.push(estudiante);
      };
    };
    return resultadoEstudiante;
  }
}
