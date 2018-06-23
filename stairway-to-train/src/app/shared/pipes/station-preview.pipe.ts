import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '../model/station';

@Pipe({
  name: 'stationPreview'
})
export class StationPreviewPipe implements PipeTransform {

  transform(value:Station[], maxShowCount:number=3): any {
    if (value.length === 0) {
      return 'Enthält keine Stationen.';
    }

    let returnStr = '';
    let showCount = Math.min(maxShowCount, value.length);
    for (let i = 0, len = showCount; i < len; i++) {
      returnStr += value[i].name;
      if (i < len-1) {
        returnStr += ', ';
      }
    }

    let rest = value.length - showCount;
    if (rest > 0) {
      returnStr += `... (+${rest} weitere)`;
    }

    return returnStr;
  }

}
