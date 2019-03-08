import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';


import { UsersModule } from './users/users.module';
import { SearchIssueModule } from './search-issue/search-issue.module';
import { IssueTrackingModule } from './issue-tracking/issue-tracking.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search-issue/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UsersModule,
    SearchIssueModule,
    IssueTrackingModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'sign-up',component:SignupComponent},
      {path:'about',component:AboutComponent},
      {path:'search',component:SearchComponent},
      // {path:'blog/:blogId',component:BlogViewComponent},
      // {path:'create',component:BlogCreateComponent},
      // {path:'edit/:blogId',component:BlogEditComponent},
      {path:'**',component:NotFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
