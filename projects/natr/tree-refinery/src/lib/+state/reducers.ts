import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {setFilterReducer} from './set-filter.reducer';


export const treeRefineryStateFeatureKey = 'treeRefineryState';

// tslint:disable-next-line:no-empty-interface
export interface TreeRefineryState {
  treeFilter: any;
}

export const reducers: ActionReducerMap<TreeRefineryState> = {
  treeFilter: setFilterReducer
};


export const metaReducers: MetaReducer<TreeRefineryState>[] = [];
