import { Component, Input, OnInit } from '@angular/core';
import { CardSchema } from "../../models/cardschema";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: CardSchema;

  constructor() { }

  ngOnInit(): void {
  }

  dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

}
