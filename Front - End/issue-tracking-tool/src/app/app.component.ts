import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Issue Tracking Tool';
  private receiverName: string;
  private receiverId: string
  constructor(private cookieService: CookieService) {

  }

  ngOnInit() {
    this.receiverId = this.cookieService.get('receiverId')
    this.receiverName = this.cookieService.get('receiverName')
    // this.cookieService.delete('receiverId')
    // this.cookieService.delete('receiverName')
  }

}
