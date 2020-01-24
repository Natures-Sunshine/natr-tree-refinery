import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilteredTreeComponent} from './components/filtered-tree/filtered-tree.component';


const routes: Routes = [
  {
    path: '', component: FilteredTreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
