import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular';

  constructor(private newService: CommonService){}
  Repdata;
  valbutton = "Save";

  ngOnInit(){
    this.newService.GetUser().subscribe(data => this.Repdata = data)
  }
  onSave = function(user, isValid: boolean){
    user.mode =
  }
}
