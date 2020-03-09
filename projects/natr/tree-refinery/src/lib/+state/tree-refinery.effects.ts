import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addFilter, LoadFiltersPropType} from './add-filter.actions';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {loadLocalTreesAction, selectTreeData} from '@natr/the-trees';
import {TreeModel} from '@natr/the-trees/lib/models/tree.model';
import {TreeNodeModel} from '@natr/the-trees/lib/models/tree-node.model';
import * as _ from 'lodash';
import {HistorianService, Logging} from '@natr/historian';
import {clearFilters} from './clear-filters.actions';


@Logging
@Injectable()
export class TreeRefineryEffects {

  constructor(private actions$: Actions, private store: Store<any>) {
  }

  public static readonly FilteredKey = 'filtered';

  private logger: HistorianService;

  private withState = concatMap(
    (action: Action) => of(action)
      .pipe(
        withLatestFrom(this.store.select(selectTreeData))
      )
  );

  treeRefineryEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(addFilter),
        this.withState,
        tap(
          ([action, treeData]: [LoadFiltersPropType & Action, TreeModel]) => {
            this.logger.debug(`.treeRefineryEffect action`, action);
            this.logger.debug(`.treeRefineryEffect treeData`, treeData);
            this.search(action.filter, treeData.nodes, action.addOrRemove);
            this.logger.debug('new treeData', treeData);
            this.store.dispatch(loadLocalTreesAction({treeData}));
          }
        )
      );
    },
    {dispatch: false}
  );

  clearFiltersEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(clearFilters),
        this.withState,
        tap(
          ([action, treeData]: [LoadFiltersPropType & Action, TreeModel]) => {
            const newTreeData: TreeModel = _.cloneDeep(treeData);
            this.logger.debug(`.clearFiltersEffect treeData`, treeData);
            newTreeData.nodes.forEach(
              (node, itemNumber) => {
                this.logger.debug(`.clearFiltersEffect node ${itemNumber}`, node);
                if (node.customMeta && node.customMeta.filterMatch) {
                  this.logger.debug(`.clearFiltersEffect deleting filter`);
                  delete node.customMeta.filterMatch;
                }
              }
            );
            this.logger.debug(`.clearFiltersEffect newTreeData`, newTreeData);
            this.store.dispatch(loadLocalTreesAction({treeData: newTreeData}));
          }
        )
      );
    },
    {dispatch: false}
  );

  private addToLists(res, deeper, listKey, key) {
    this.logger.debug('res, deeper, listKey, key', res, deeper, listKey, key);
    deeper[listKey].forEach(
      item => res[listKey].add(`${key}.${item}`)
    );
  }

  private search(searchObject: TreeNodeModel, nodes: TreeNodeModel[], addOrClear = true): void {
    this.logger.debug(`${TreeRefineryEffects.name}.search searchObject`, searchObject);
    nodes.forEach(
      node => {
        this.logger.debug(`${TreeRefineryEffects.name}.search node`, node);
        const diff = this.getObjectDiff(searchObject, node);
        this.logger.debug(`${TreeRefineryEffects.name} diff`, diff);
        if (diff.matchingKeys.size > 0 && diff.matchingKeys.size > diff.different.size) {
          if (!node.customMeta) {
            node.customMeta = {};
          }
          node.customMeta.filterMatch = addOrClear;
        }
      }
    );
  }

  private getObjectDiff(a, b) {
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
          this.logger.debug(`type of matching value`, typeof value);
          this.logger.debug(`value, b[${key}]`, value, b[key]);
          if (typeof (value) !== typeof ({})) {
          } else {
            this.logger.debug('going deeper');
            res = this.getObjectDiff(a[key], b[key]);
          }
          return res;
        } else {
          if (typeof (a[key]) !== typeof ({}) || typeof (b[key]) !== typeof ({})) {
            // dead end.
            res.different.add(key);
            return res;
          } else {
            res.different.add(key);
            const deeper = this.getObjectDiff(a[key], b[key]);
            this.logger.debug(`deeper`, deeper);

            this.addToLists(res, deeper, 'matchingKeys', key);
            this.addToLists(res, deeper, 'different', key);
            this.addToLists(res, deeper, 'missingFromFirst', key);
            this.addToLists(res, deeper, 'missingFromSecond', key);

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
}
