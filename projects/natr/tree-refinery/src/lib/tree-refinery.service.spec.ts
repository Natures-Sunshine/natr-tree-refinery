import { TestBed } from '@angular/core/testing';

import { TreeRefineryService } from './tree-refinery.service';

describe('TreeRefineryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeRefineryService = TestBed.get(TreeRefineryService);
    expect(service).toBeTruthy();
  });
});
