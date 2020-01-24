import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredTreeComponent } from './filtered-tree.component';

describe('FilteredTreeComponent', () => {
  let component: FilteredTreeComponent;
  let fixture: ComponentFixture<FilteredTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
