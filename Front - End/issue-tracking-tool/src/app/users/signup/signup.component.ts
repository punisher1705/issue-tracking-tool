import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppServiceService } from './../../app-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobileNumber: any;
  public email: any;
  public password: any;

  constructor(public appService: AppServiceService, public router: Router,
    public toastr: ToastrService,
    ) { 

     }

  ngOnInit() {
  }

  public goToSignIn: any = () => {
    this.router.navigate(['/'])
  }

  public signUpFunction: any = () => {
    if(!this.firstName) {
      this.toastr.warning('Enter First Name');
    } else if(!this.lastName) {
      this.toastr.warning('Enter Last Name');
    } else if(!this.mobileNumber) {
      this.toastr.warning('Enter Mobile Number');
    } else if(!this.email) {
      this.toastr.warning('Enter Email');
    } else if(!this.password) {
      this.toastr.warning('Enter Password');
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password
      }
      // console.log(data)
      this.appService.signUpFunction(data)
      .subscribe((apiResponse) => {
        console.log(apiResponse)
        if(apiResponse.status === 200) {
          this.toastr.success('Sign Up Successful')
          setTimeout(() => {
            this.goToSignIn();
          }, 2000);
        } else {
          this.toastr.error(apiResponse.message);
        }
      }, (err) => {
        this.toastr.error('Some Error Occured')
      })
    }
  }
}
