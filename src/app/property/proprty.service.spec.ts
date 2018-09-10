import { TestBed, inject } from '@angular/core/testing';

import { PropertyService } from './proprty.service';

describe('ProprtyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyService]
    });
  });

  it('should be created', inject([PropertyService], (service: PropertyService) => {
    expect(service).toBeTruthy();
  }));
});
