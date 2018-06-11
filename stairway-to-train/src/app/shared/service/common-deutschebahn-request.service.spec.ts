import { TestBed, inject } from '@angular/core/testing';

import { CommonDeutschebahnRequestService } from './common-deutschebahn-request.service';

describe('CommonDeutschebahnRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonDeutschebahnRequestService]
    });
  });

  it('should be created', inject([CommonDeutschebahnRequestService], (service: CommonDeutschebahnRequestService) => {
    expect(service).toBeTruthy();
  }));
});
