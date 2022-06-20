import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectionLevel'
})
export class SectionLevelPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value === 'elementary' ? 'Elementary' : 'High School';
  }

}
