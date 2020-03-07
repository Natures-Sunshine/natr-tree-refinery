import {Action, createReducer, on} from '@ngrx/store';
import {addFilter, LoadFiltersPropType} from './add-filter.actions';
import {clearFilters} from './clear-filters.actions';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import * as lo from 'lodash';

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'set-filter.reducer.ts');

export const filterFeatureKey = 'treeFilter';

// tslint:disable-next-line:no-empty-interface
export interface FilterState {

}

export const initialState: FilterState = {};

const onAddFiltersReducerFunction = (state: FilterState, action: LoadFiltersPropType & Action) => {
  return {...state, ...action.filter};
};

const onClearFiltersReducerFunction = (state: FilterState, action: Action) => {
  logger.debug('.onClearFiltersReducerFunction state: ', state);
  logger.debug('.onClearFiltersReducerFunction action: ', action);
  return {...lo.cloneDeep(state)};
};

const setFilterReducerRef = createReducer(
  initialState,
  on(addFilter, onAddFiltersReducerFunction),
  on(clearFilters, onClearFiltersReducerFunction)
);

export function setFilterReducer(state, action) {
  return setFilterReducerRef(state, action);
}
