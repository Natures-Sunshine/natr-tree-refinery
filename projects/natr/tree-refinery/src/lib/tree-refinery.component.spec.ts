import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRefineryComponent } from './tree-refinery.component';

describe('TreeRefineryComponent', () => {
  let component: TreeRefineryComponent;
  let fixture: ComponentFixture<TreeRefineryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRefineryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRefineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
