import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {addFilter} from '../+state/add-filter.actions';
import {clearFilters} from '../+state/clear-filters.actions';

@Injectable({
  providedIn: 'root'
})
export class FilterFacadeService {

  constructor(private store: Store<any>) {
  }

  dispatchAddFilter(filter: any) {
    this.store.dispatch(addFilter({filter, addOrRemove: true}));
  }

  dispatchRemoveFilter(filter: any) {
    this.store.dispatch(addFilter({filter, addOrRemove: false}));
  }

  dispatchClearFilters() {
    this.store.dispatch(clearFilters());
  }

  getFilterSubscription() {
    // this.store.select()
  }
}
