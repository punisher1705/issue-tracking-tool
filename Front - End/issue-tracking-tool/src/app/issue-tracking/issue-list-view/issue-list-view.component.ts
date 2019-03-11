import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $;

@Component({
  selector: 'app-issue-list-view',
  templateUrl: './issue-list-view.component.html',
  styleUrls: ['./issue-list-view.component.css']
})
export class IssueListViewComponent implements OnInit {
  //for dataTable
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;

  public mf: any = [
    {
      'first': 'Mark',
      'last': 'Otto',
      'handle': '@mdo'
    },
    {
      'first': 'Jacob',
      'last': 'Thornton',
      'handle': '@fat'
    },
    {
      'first': 'Larry',
      'last': 'the Bird',
      'handle': '@twitter'
    },
    {
      'first': 'Mark',
      'last': 'Otto',
      'handle': '@mdo'
    },
    {
      'first': 'Jacob',
      'last': 'Thornton',
      'handle': '@fat'
    },
    {
      'first': 'Larry',
      'last': 'the Bird',
      'handle': '@twitter'
    }
  ]

  constructor() { }

  ngOnInit() {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable();
  }

}
