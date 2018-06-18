import { Injectable } from '@angular/core';
import { CommonDeutschebahnRequestService } from './common-deutschebahn-request.service';
import { Facility } from '../model/facility';
import { element } from 'protractor';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class FaStaService {

  private RESSOUCE = 'fasta/v2/stations';

  private cache:Object = {};

  private subjectMap:Object = {};

  constructor(private requestService: CommonDeutschebahnRequestService) { }

  fetch(stationId:string, forceServerRequest:boolean = false) {
    const subject:Subject<Facility[]> = this.subjectMap[stationId] = this.subjectMap[stationId] || new Subject();
    let facilities:Array<Facility>;

    if (forceServerRequest !== true && this.cache[stationId]) {
      facilities = this.cache[stationId];
      subject.next(facilities);
      return;
    }

    this.requestService.get(`${this.RESSOUCE}/${stationId}`, {}).subscribe(result => {
      if (result['body'] && result['body'].facilities) {
          facilities = this.castFacilities(result['body'].facilities);
          this.cache[stationId] = facilities;
          subject.next(facilities);
      }
    });
  }

  getFacilitiesByStation(stationId):Observable<Facility[]> {
    const subject:Subject<Facility[]> = this.subjectMap[stationId] = this.subjectMap[stationId] || new Subject();
    return subject.asObservable();
  }

  castFacilities(data:Array<Object>):Array<Facility> {
    const facilities:Array<Facility> = [];
    data.forEach((element:any) => {
      facilities.push(new Facility(element.id, element.type, element.description, element.state));
    });
    return facilities;
  }

}
