import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDescViewComponent } from './issue-desc-view/issue-desc-view.component';
import { IssueListViewComponent } from './issue-list-view/issue-list-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from 'ngx-ckeditor';
// import { DataTableModule } from "angular-6-datatable";

@NgModule({
  declarations: [IssueDescViewComponent, IssueListViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'issue-desc',component:IssueDescViewComponent},
    ]),
    CKEditorModule,
    // DataTableModule
  ]
})
export class IssueTrackingModule { 
   
}
