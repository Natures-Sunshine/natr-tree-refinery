import {createFeatureSelector} from '@ngrx/store';
import {treeRefineryStateFeatureKey, TreeRefineryState} from './reducers';

export const getTreeRefineryState = createFeatureSelector<TreeRefineryState>(treeRefineryStateFeatureKey);

