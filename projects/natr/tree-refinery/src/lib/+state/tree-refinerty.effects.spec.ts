import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TreeRefineryEffects } from './tree-refinery.effects';

describe('AddFilterInfoEffects', () => {
  let actions$: Observable<any>;
  let effects: TreeRefineryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TreeRefineryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TreeRefineryEffects>(TreeRefineryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
