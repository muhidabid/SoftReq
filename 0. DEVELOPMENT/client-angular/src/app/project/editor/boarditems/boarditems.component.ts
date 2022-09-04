import { Component, OnInit } from '@angular/core';
import { ListitemsComponent } from '../listitems/listitems.component';

@Component({
  selector: 'app-boarditems',
  templateUrl: './boarditems.component.html',
  styleUrls: ['./boarditems.component.css']
})
export class BoarditemsComponent implements OnInit {

  lists: ListitemsComponent[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addList() {
    var newList = new ListitemsComponent();
    this.lists.push(newList);
  }

}
