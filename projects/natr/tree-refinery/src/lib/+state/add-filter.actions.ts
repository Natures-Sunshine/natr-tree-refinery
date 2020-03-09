import { createAction, props } from '@ngrx/store';
import {TreeModel} from '@natr/the-trees/lib/models/tree.model';
import {TreeNodeModel} from '@natr/the-trees/lib/models/tree-node.model';

export interface LoadFiltersPropType<T extends TreeNodeModel = TreeNodeModel> {
  filter: T;
  addOrRemove: boolean;
}

export const addFilter = createAction(
  '[SetFilter] Add Filters',
  props<LoadFiltersPropType>()
);

