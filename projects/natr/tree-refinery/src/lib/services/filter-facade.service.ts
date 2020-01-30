import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {loadFilters} from '../+state/set-filter.actions';

@Injectable({
  providedIn: 'root'
})
export class FilterFacadeService {

  constructor(private store: Store<any>) {
  }

  dispatchLoadFilters(filter: any) {
    this.store.dispatch(loadFilters({filter}));
  }

  getFilterSubscription() {
    // this.store.select()
  }
}
