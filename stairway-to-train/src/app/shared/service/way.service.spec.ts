import { TestBed, inject } from '@angular/core/testing';

import { WayService } from './way.service';

describe('WayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WayService]
    });
  });

  it('should be created', inject([WayService], (service: WayService) => {
    expect(service).toBeTruthy();
  }));
});
