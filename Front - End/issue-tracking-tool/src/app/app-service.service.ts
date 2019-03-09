import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  public url = 'localhost:3000/api/v1/users'
  constructor(public http: HttpClient) { }
  
  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  public signUpFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('mobileNumber', data.mobileNumber)
    .set('email',data.email)
    .set('password',data.password)
    console.log(`${this.url}/signup`)
    return this.http.post(`${this.url}/signup`,params)
  }

  public signInFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('email', data.email)
    .set('password', data.password)

    return this.http.post(`${this.url}/login`,params)
  }
}

