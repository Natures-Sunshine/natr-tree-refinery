import { createAction, props } from '@ngrx/store';

export interface LoadFiltersPropType<T = any> {
  filter: T;
}

export const loadFilters = createAction(
  '[SetFilter] Load Filters',
  props<LoadFiltersPropType>()
);

