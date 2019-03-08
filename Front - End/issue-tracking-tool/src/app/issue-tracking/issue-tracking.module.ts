import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDescViewComponent } from './issue-desc-view/issue-desc-view.component';
import { IssueListViewComponent } from './issue-list-view/issue-list-view.component';

@NgModule({
  declarations: [IssueDescViewComponent, IssueListViewComponent],
  imports: [
    CommonModule
  ]
})
export class IssueTrackingModule { }
