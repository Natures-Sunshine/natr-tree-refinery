import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {filterFeatureKey, setFilterReducer} from '../set-filter.reducer';


export const treeRefineryStateFeatureKey = 'treeRefineryState';

// tslint:disable-next-line:no-empty-interface
export interface TreeRefineryState {
  [filterFeatureKey]: any;
}

export const reducers: ActionReducerMap<TreeRefineryState> = {
  [filterFeatureKey]: setFilterReducer
};


export const metaReducers: MetaReducer<TreeRefineryState>[] = [];
