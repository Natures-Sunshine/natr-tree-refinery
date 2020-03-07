import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilterFacadeService} from '../../../../../natr/tree-refinery/src/lib/services/filter-facade.service';
import {TreeDataFacadeService} from '@natr/the-trees';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'app-filtered-tree',
  templateUrl: './filtered-tree.component.html',
  styleUrls: ['./filtered-tree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilteredTreeComponent implements OnInit {
  logger: HistorianService;
  nodeClass = 'node';

  constructor(private filterFacadeService: FilterFacadeService, private treeDataFacadeService: TreeDataFacadeService) {
  }

  ngOnInit() {
    this.treeDataFacadeService.dispatchRemoteLoadTree(new URL('http://localhost:4200/assets/tree.json'));
  }

  setFilter() {
    this.filterFacadeService.dispatchAddFilter({data: {fing: 'one'}});
    this.filterFacadeService.dispatchAddFilter({id: '2'});
  }

  clear() {
    this.filterFacadeService.dispatchClearFilters();
    // this.filterFacadeService.dispatchAddFilter({});
  }


  getClass(node): string | void {
    console.log(`${FilteredTreeComponent.name}.getClass node`, node);
    if (node && node.meta && node.meta.filterMatch) {
      return 'node-inactive';
    }
    return 'node-group';
  }
}
