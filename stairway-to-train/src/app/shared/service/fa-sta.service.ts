import { Injectable } from '@angular/core';
import { CommonDeutschebahnRequestService } from './common-deutschebahn-request.service';

@Injectable()
export class FaStaService {

  private RESSOUCE = 'fasta/v2';

  constructor(private requestService: CommonDeutschebahnRequestService) { }

}
