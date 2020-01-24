import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getTreeFilterState} from '../../../../../natr/tree-refinery/src/lib/+state/filter.selectors';
import {loadFilters} from '../../../../../natr/tree-refinery/src/lib/+state/set-filter.actions';

@Component({
  selector: 'app-filtered-tree',
  templateUrl: './filtered-tree.component.html',
  styleUrls: ['./filtered-tree.component.css']
})
export class FilteredTreeComponent implements OnInit {

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select(getTreeFilterState).subscribe(
      state => {
        console.log(`${FilteredTreeComponent.name} state is`, state);
      }
    );
  }


  setFilter() {
    this.store.dispatch(loadFilters({filter: {one: 1}}));
  }
}
