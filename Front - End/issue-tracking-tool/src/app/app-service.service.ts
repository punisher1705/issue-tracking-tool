import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieModule } from 'ngx-cookie/ngx-cookie';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  public url = 'http://localhost:3000/'
  constructor(public http: HttpClient) { }
}

