import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CookieModule } from 'ngx-cookie/ngx-cookie';
import { CookieService } from 'ngx-cookie-service';
import { UsersModule } from './users/users.module';
import { SearchIssueModule } from './search-issue/search-issue.module';
import { IssueTrackingModule } from './issue-tracking/issue-tracking.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
// import { SignupComponent } from './users/signup/signup.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search-issue/search/search.component';

import { AppServiceService } from './app-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    SearchIssueModule,
    IssueTrackingModule,
    HttpClientModule,
    // CookieModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'about',component:AboutComponent},
      {path:'search',component:SearchComponent},
      // {path:'blog/:blogId',component:BlogViewComponent},
      // {path:'create',component:BlogCreateComponent},
      // {path:'edit/:blogId',component:BlogEditComponent},
      {path:'**',component:NotFoundComponent}
    ])
  ],
  providers: [AppServiceService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
