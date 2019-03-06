import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDescViewComponent } from './issue-desc-view.component';

describe('IssueDescViewComponent', () => {
  let component: IssueDescViewComponent;
  let fixture: ComponentFixture<IssueDescViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDescViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDescViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
