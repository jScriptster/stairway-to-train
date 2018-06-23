import { Pipe, PipeTransform } from '@angular/core';
import { Facility } from '../model/facility';
import { element } from 'protractor';

@Pipe({
  name: 'favorFilter',
  pure: false
})
export class FavorFilterPipe implements PipeTransform {

  transform(value: Facility[], favor:string[]): any {
    let  result;
    if (favor && favor.length > 0) {
      result = value.filter((element:Facility) => {
        return favor.indexOf(element.id) > -1;
      });
    } else {
      result = value.filter((element:Facility) => {
        return element.state !== 'ACTIVE';
      });
    }
    
    return result;
  }

}
