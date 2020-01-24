import {Action, ActionType, createReducer, on} from '@ngrx/store';
import {loadFilters, LoadFiltersPropType} from './set-filter.actions';


export const filterFeatureKey = 'treeFilter';

// tslint:disable-next-line:no-empty-interface
export interface FilterState {

}

export const initialState: FilterState = {

};

const onLoadFiltersReducerFunction = (state: FilterState, action: LoadFiltersPropType & Action) => {
  return {...state, ...action.filter};
};

export const setFilterReducer = createReducer(
  initialState,
  on(loadFilters, onLoadFiltersReducerFunction)
);

