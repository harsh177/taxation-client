import { TestBed, inject } from '@angular/core/testing';

import { TaxDetailsService } from './tax-details.service';

describe('TaxDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxDetailsService]
    });
  });

  it('should be created', inject([TaxDetailsService], (service: TaxDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
