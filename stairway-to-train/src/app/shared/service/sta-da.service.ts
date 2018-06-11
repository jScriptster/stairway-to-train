import { Injectable } from '@angular/core';
import { CommonDeutschebahnRequestService } from './common-deutschebahn-request.service';

@Injectable()
export class StaDaService {

  private RESSOUCE = 'stada/v2/stations';

  constructor(private requestService: CommonDeutschebahnRequestService) { }

  find() {
    this.requestService.get(this.RESSOUCE, {
      searchstring: 'ostkreu*',
      limit: 12
    });
  }






}
