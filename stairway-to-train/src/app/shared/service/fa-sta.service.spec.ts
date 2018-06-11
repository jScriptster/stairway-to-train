import { TestBed, inject } from '@angular/core/testing';

import { FaStaService } from './fa-sta.service';

describe('FaStaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaStaService]
    });
  });

  it('should be created', inject([FaStaService], (service: FaStaService) => {
    expect(service).toBeTruthy();
  }));
});
