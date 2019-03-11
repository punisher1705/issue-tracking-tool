import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-issue-desc-view',
  templateUrl: './issue-desc-view.component.html',
  styleUrls: ['./issue-desc-view.component.css']
})
export class IssueDescViewComponent implements OnInit {
  public hiddenFieldforUserId: string;
  public hiddenFieldforUserName: string;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    // this.cookieService.set('receiverName','Rohan')
    // this.cookieService.set('receiverId','1')

    this.hiddenFieldforUserId = this.cookieService.get('receiverId')
    this.hiddenFieldforUserName =  this.cookieService.get('receiverName')
    
  }

}
