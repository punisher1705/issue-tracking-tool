import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueTrackingViewComponent } from './issue-tracking-view/issue-tracking-view.component';
import { IssueDescViewComponent } from './issue-desc-view/issue-desc-view.component';
import { IssueListViewComponent } from './issue-list-view/issue-list-view.component';

@NgModule({
  declarations: [IssueTrackingViewComponent, IssueDescViewComponent, IssueListViewComponent],
  imports: [
    CommonModule
  ]
})
export class IssueTrackingModule { }
