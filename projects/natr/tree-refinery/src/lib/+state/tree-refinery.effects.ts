import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadFilters, LoadFiltersPropType} from './set-filter.actions';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {loadLocalTreesAction, selectTreeData} from '@natr/the-trees';
import {TreeModel} from '@natr/the-trees/lib/models/tree.model';
import {TreeNodeModel} from '@natr/the-trees/lib/models/tree-node.model';
import * as _ from 'lodash';


@Injectable()
export class TreeRefineryEffects {

  public static readonly FilteredKey = 'filtered';

  private withState = concatMap(
    (action: Action) => of(action)
      .pipe(
        withLatestFrom(this.store.select(selectTreeData))
      )
  );

  treeRefineryEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadFilters),
        this.withState,
        tap(
          ([action, treeData]: [LoadFiltersPropType & Action, TreeModel]) => {
            console.log(`${TreeRefineryEffects.name}.treeRefineryEffect action`, action);
            console.log(`${TreeRefineryEffects.name}.treeRefineryEffect treeData`, treeData);
            TreeRefineryEffects.search(action.filter, treeData.nodes);
            this.store.dispatch(loadLocalTreesAction({treeData}));
          }
        )
      );
    },
    {dispatch: false}
  );

  constructor(private actions$: Actions, private store: Store<any>) {
  }

  private static search(searchObject: TreeNodeModel, nodes: TreeNodeModel[]): void {
    console.log(`${TreeRefineryEffects.name}.search searchObject`, searchObject);
    nodes.forEach(
      node => {
        console.log(`${TreeRefineryEffects.name}.search node`, node);
        const diff = TreeRefineryEffects.getObjectDiff(searchObject, node);
        console.log(`${TreeRefineryEffects.name} diff`, diff);
        if (diff.matchingKeys.size > 0 && diff.matchingKeys.size > diff.different.size) {
          node.meta.filterMatch = true;
        }
      }
    );
  }

  private static getObjectDiff(a, b) {
    const result: {
      matchingKeys: Set<string>
      different: Set<string>,
      missingFromFirst: Set<string>,
      missingFromSecond: Set<string>
    } = {
      matchingKeys: new Set<string>(),
      different: new Set<string>(),
      missingFromFirst: new Set<string>(),
      missingFromSecond: new Set<string>()
    };

    _.reduce(a, (res, value, key) => {
      if (b.hasOwnProperty(key)) {
        res.matchingKeys.add(key);
        if (_.isEqual(value, b[key])) {
          console.log(`${TreeRefineryEffects.name} type of matching value`, typeof value);
          console.log(`${TreeRefineryEffects.name} typeof (value) !== typeof ({})`, typeof (value) !== typeof ({}));
          console.log(`${TreeRefineryEffects.name} typeof (value) === typeof ({}))`, typeof (value) === typeof ({}));
          console.log(`${TreeRefineryEffects.name} typeof typeof ({})`, typeof ({}));
          if (typeof (value) !== typeof ({})) {
          } else {
            console.log('going deeper');
            res = TreeRefineryEffects.getObjectDiff(a[key], b[key]);
          }
          return res;
        } else {
          if (typeof (a[key]) !== typeof ({}) || typeof (b[key]) !== typeof ({})) {
            // dead end.
            res.different.add(key);
            return res;
          } else {
            res.different.add(key);
            const deeper = TreeRefineryEffects.getObjectDiff(a[key], b[key]);
            console.log(`${TreeRefineryEffects.name} deeper`, deeper);

            TreeRefineryEffects.addToLists(res, deeper, 'matchingKeys', key);
            TreeRefineryEffects.addToLists(res, deeper, 'different', key);
            TreeRefineryEffects.addToLists(res, deeper, 'missingFromFirst', key);
            TreeRefineryEffects.addToLists(res, deeper, 'missingFromSecond', key);

            return res;
          }
        }
      } else {
        res.missingFromSecond.add(key);
        return res;
      }
    }, result);

    _.reduce(b, (res, value, key) => {
      if (a.hasOwnProperty(key)) {
        return res;
      } else {
        res.missingFromFirst.add(key);
        return res;
      }
    }, result);

    return result;
  }

  private static addToLists(res, deeper, listKey, key) {
    deeper[listKey].forEach(
      item => res[listKey].add(`${key}.${item}`)
    );
  }
}
