import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueListViewComponent } from './issue-list-view.component';

describe('IssueListViewComponent', () => {
  let component: IssueListViewComponent;
  let fixture: ComponentFixture<IssueListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
