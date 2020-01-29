import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilterFacadeService} from '../../../../../natr/tree-refinery/src/lib/services/filter-facade.service';
import {TreeDataFacadeService} from '@natr/the-trees';

@Component({
  selector: 'app-filtered-tree',
  templateUrl: './filtered-tree.component.html',
  styleUrls: ['./filtered-tree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilteredTreeComponent implements OnInit {

  constructor(private filterFacadeService: FilterFacadeService, private treeDataFacadeService: TreeDataFacadeService) {
  }

  ngOnInit() {
    this.treeDataFacadeService.dispatchRemoteLoadTree(new URL('http://localhost:4200/assets/tree.json'));
  }

  setFilter() {
    this.filterFacadeService.dispatchLoadFilters({id: '1', data: {color: '#a27ea9', fing: 'one'}});
  }

  getClass(node): string | void  {
    console.log(`${FilteredTreeComponent.name}.getClass node`, node);
    if (node.id === '2') {
      return 'node-inactive';
    }
  }
}
