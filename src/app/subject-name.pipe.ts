import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subjectName'
})
export class SubjectNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value) {
    case 'spanish':
      return 'Lengua Espanola';
    case 'english':
      return 'Ingles';
    case 'french':
      return 'Frances';
    case 'math':
      return 'Matematica';
    case 'history':
      return 'Ciencias Sociales';
    case 'science':
      return 'Ciencias de la Naturaleza';
    case 'art':
      return 'Educacion Artistica';
    case 'sports':
      return 'Educacion Fisica';
    case 'religion':
      return 'Formacion Integral Humana y Religiosa';
    default:
      return '';
    }
  }

}
