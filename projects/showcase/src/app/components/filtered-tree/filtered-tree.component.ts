import {Component, OnInit} from '@angular/core';
import {FilterFacadeService} from '../../../../../natr/tree-refinery/src/lib/services/filter-facade.service';
import {TreeDataFacadeService} from '@natr/the-trees';

@Component({
  selector: 'app-filtered-tree',
  templateUrl: './filtered-tree.component.html',
  styleUrls: ['./filtered-tree.component.css']
})
export class FilteredTreeComponent implements OnInit {

  constructor(private filterFacadeService: FilterFacadeService, private treeDataFacadeService: TreeDataFacadeService) {
  }

  ngOnInit() {
    this.treeDataFacadeService.dispatchRemoteLoadTree(new URL('http://localhost:4200/assets/tree.json'));
  }

  setFilter() {
    this.filterFacadeService.dispatchLoadFilters({one: 1});
  }
}
