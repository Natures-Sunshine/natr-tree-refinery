import {NgModule} from '@angular/core';
import {TreeRefineryComponent} from './tree-refinery.component';
import {EffectsModule} from '@ngrx/effects';
import {TreeRefineryEffects} from './+state/tree-refinery.effects';
import {StoreModule} from '@ngrx/store';
import * as fromTreeFilterState from './+state/reducers';


@NgModule({
  declarations: [TreeRefineryComponent],
  imports: [
    EffectsModule.forFeature([TreeRefineryEffects]),
    StoreModule.forFeature(
      fromTreeFilterState.treeRefineryStateFeatureKey,
      fromTreeFilterState.reducers,
      {metaReducers: fromTreeFilterState.metaReducers}
    )
  ],
  exports: [TreeRefineryComponent]
})
export class TreeRefineryModule {
}
