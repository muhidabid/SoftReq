import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {

  req:Requirements[] = [];
  currentDate: Date = new Date();

  constructor() {
    this.req = [new Requirements("System should have 2-factor authentication", "22-05-2022")]
    console.log("constructor called")
    console.log("date: ", this.currentDate.toDateString)
  }

  ngOnInit(): void {
    console.log("ngOnIt claled")
  }

  AddReq(text:HTMLInputElement, d:HTMLInputElement) {
    this.req.push(new Requirements(text.value, d.value))
  }

}

class Requirements{
  constructor(public text:string, public d:string) {

  }

  print():void{
    console.log("User Story: " + this.text);
  }
}
