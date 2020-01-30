import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadFilters, LoadFiltersPropType} from './set-filter.actions';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {selectTreeData} from '@natr/the-trees';
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
      }
    );
  }

  private static getObjectDiff(a, b) {
    const result = {
      matchingKeys: [],
      different: [],
      missingFromFirst: [],
      missingFromSecond: []
    };

    _.reduce(a, (res, value, key) => {
      if (b.hasOwnProperty(key)) {
        if (_.isEqual(value, b[key])) {
          res.matchingKeys.push(key);
          return res;
        } else {
          if (typeof (a[key]) !== typeof ({}) || typeof (b[key]) !== typeof ({})) {
            // dead end.
            res.different.push(key);
            return res;
          } else {
            const deeper = TreeRefineryEffects.getObjectDiff(a[key], b[key]);
            console.log(`${TreeRefineryEffects.name} deeper`, deeper);


            return res;
          }
        }
      } else {
        res.missingFromSecond.push(key);
        return res;
      }
    }, result);

    _.reduce(b, (res, value, key) => {
      if (a.hasOwnProperty(key)) {
        return res;
      } else {
        res.missingFromFirst.push(key);
        return res;
      }
    }, result);

    console.log(`${TreeRefineryEffects.name} search results`, result);
    return result;
  }

  private static addToLists(res, deeper, key) {
    res.matchingKeys = res.matchingKeys.concat(_.map(deeper.matchingKeys, (subPath) => {
      console.log(`${TreeRefineryEffects.name} key and subPath`, key, subPath);
      return key + '.' + subPath;
    }));

    res.different = res.different.concat(_.map(deeper.different, (subPath) => {
      return key + '.' + subPath;
    }));

    res.missingFromSecond = res.missingFromSecond.concat(_.map(deeper.missingFromSecond, (subPath) => {
      return key + '.' + subPath;
    }));

    res.missingFromFirst = res.missingFromFirst.concat(_.map(deeper.missingFromFirst, (subPath) => {
      return key + '.' + subPath;
    }));
  }
}
