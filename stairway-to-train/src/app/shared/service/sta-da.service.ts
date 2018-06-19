import { Injectable } from '@angular/core';
import { CommonDeutschebahnRequestService } from './common-deutschebahn-request.service';
import { Station } from '../model/station';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaDaService {

  private RESSOUCE = 'stada/v2/stations';

  private stationSubject:Subject<Station[]> = new Subject<Station[]>();

  constructor(private requestService: CommonDeutschebahnRequestService) { }

  find(query) {
    this.requestService.get(this.RESSOUCE, {
      searchstring: `${query}*`,
      limit: 5
    }).subscribe(result => {
      const stationList = this.castResult(result['body']);
      this.stationSubject.next(stationList);
    });
  }

  getSearchResults():Observable<Station[]> {
    return this.stationSubject.asObservable();
  }

  castResult(result):Station[] {
    const stationList = [];
    if (result && result.result) {
      result.result.forEach(element => {
        stationList.push(new Station(
          element.number,
          element.name,
          element.federalState,
          element.hasSteplessAccess,
          element.hasWiFi
        ));
      });
    }
    return stationList;
  }

}
