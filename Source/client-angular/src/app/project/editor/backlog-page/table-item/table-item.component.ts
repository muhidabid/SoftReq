import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {

    ID: any;
    Requirement: any;
    Priority: any;
    Status: any;
    Legalliability: any;
    CrossRef: any;

  table = [
    {
      ID: "001",
      Requirement: "As a user, I want to be able to contact repositories.",
      Priority: 3,
      Status: "Must",
      Legalliability: "Must",
      CrossRef: "003, 002"
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
