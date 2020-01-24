import {NgModule} from '@angular/core';
import {TreeRefineryComponent} from './tree-refinery.component';
import {EffectsModule} from '@ngrx/effects';
import {AddFilterInfoEffects} from './+state/add-filter-info.effects';
import {TheTreesModule} from '@natr/the-trees';
import {StoreModule} from '@ngrx/store';
import * as fromTreeFilterState from './+state/reducers';


@NgModule({
  declarations: [TreeRefineryComponent],
  imports: [
    EffectsModule.forFeature([AddFilterInfoEffects]),
    TheTreesModule,
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
