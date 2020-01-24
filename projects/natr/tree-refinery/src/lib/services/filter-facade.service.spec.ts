import { TestBed } from '@angular/core/testing';

import { FilterFacadeService } from './filter-facade.service';

describe('FilterFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterFacadeService = TestBed.get(FilterFacadeService);
    expect(service).toBeTruthy();
  });
});
