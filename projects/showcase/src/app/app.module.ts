import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilteredTreeComponent } from './components/filtered-tree/filtered-tree.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TreeRefineryModule} from '../../../natr/tree-refinery/src/lib/tree-refinery.module';
import {TheTreesModule} from '@natr/the-trees';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FilteredTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    TreeRefineryModule,
    TheTreesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
