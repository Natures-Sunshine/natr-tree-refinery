import {Action, createReducer, on} from '@ngrx/store';
import {loadFilters, LoadFiltersPropType} from './set-filter.actions';


export const filterFeatureKey = 'treeFilter';

// tslint:disable-next-line:no-empty-interface
export interface FilterState {

}

export const initialState: FilterState = {};

const onLoadFiltersReducerFunction = (state: FilterState, action: LoadFiltersPropType & Action) => {
  return {...state, ...action.filter};
};

const setFilterReducerRef = createReducer(
  initialState,
  on(loadFilters, onLoadFiltersReducerFunction)
);

export function setFilterReducer(state, action) {
  return setFilterReducerRef(state, action);
}
