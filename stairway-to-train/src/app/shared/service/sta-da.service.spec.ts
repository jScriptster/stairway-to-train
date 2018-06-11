import { TestBed, inject } from '@angular/core/testing';

import { StaDaService } from './sta-da.service';

describe('StaDaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaDaService]
    });
  });

  it('should be created', inject([StaDaService], (service: StaDaService) => {
    expect(service).toBeTruthy();
  }));
});
