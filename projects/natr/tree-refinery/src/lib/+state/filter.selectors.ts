import {createSelector} from '@ngrx/store';
import {getTreeRefineryState} from './tree-refinery.selectors';
import {TreeRefineryState} from './reducers';
import {filterFeatureKey} from './set-filter.reducer';

export const getTreeFilterState = createSelector(
  getTreeRefineryState,
  (state: TreeRefineryState) => state[filterFeatureKey]
);

