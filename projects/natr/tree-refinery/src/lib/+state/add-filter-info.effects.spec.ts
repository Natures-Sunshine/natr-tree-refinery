import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AddFilterInfoEffects } from './add-filter-info.effects';

describe('AddFilterInfoEffects', () => {
  let actions$: Observable<any>;
  let effects: AddFilterInfoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddFilterInfoEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<AddFilterInfoEffects>(AddFilterInfoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
