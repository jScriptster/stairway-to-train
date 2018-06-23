import { Pipe, PipeTransform } from '@angular/core';
import { Facility } from '../model/facility';

@Pipe({
  name: 'facilityOutOfOrderAlarm'
})
export class FacilityOutOfOrderAlarmPipe implements PipeTransform {

  transform(value: Facility[], hasSteplessAccess:string, cssClassOk:string, cssClassAlarm:string):string {
    let isAlarm = false;
    if (!value || value.length === 0) {
      isAlarm = hasSteplessAccess !== 'yes';
    } else {
      let result = value.filter((facility:Facility) => {
        return facility.state !== 'ACTIVE';
      });
      isAlarm = result.length > 0
    }
      
    return isAlarm ? cssClassAlarm : cssClassOk;
  }
}