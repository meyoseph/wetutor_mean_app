import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if(value.length ===0 || filterString === ''){
      return value;
    }

    const tutors = [];
    for(const tutor of value){
      if(tutor['name'] === filterString){
        tutors.push(tutor)
      }
    }
    return tutors;
  }

}
