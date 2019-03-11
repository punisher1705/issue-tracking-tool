import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from './../../app-service.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(
    public appService: AppServiceService,
    public router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up']);
  }

  public signInFunction: any = () => {
    if(!this.email) {
      this.toastr.warning('Enter Email')
    } else if (!this.password) {
      this.toastr.warning('Enter Password')
    } else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signInFunction(data)
      .subscribe((apiResponse) => {
        if(apiResponse.status === 200) {
          console.log(apiResponse)
          this.cookieService.set('receiverId',apiResponse.data.userDetails.userId)
          this.cookieService.set('receiverName',apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName)
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
          // this.router.navigate([])
        } else {
          this.toastr.error(apiResponse.message)
        }
        }, (err) => {
          this.toastr.error('Some Error Occured')
        });
  }
  }

}
