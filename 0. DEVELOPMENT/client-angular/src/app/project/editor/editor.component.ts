import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UserStories } from 'src/app/models/userstories';
import { UserstoriesService } from 'src/app/services/userstories.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  userstories: UserStories[] = [];

  enteredReq = "";

  constructor(
    private _userstoriesservice: UserstoriesService,
    private userStoriesService: UserstoriesService,
    private http: HttpClient
    ) {}

  ngOnInit(): void {

    // this.userStoriesService.addUserStory(this.enteredReq).subscribe((response: any) =>{
    //   console.log("added user story");
    //   console.log(response);
    // });

    this.userStoriesService.currentUserStory.subscribe(
      msg => this.enteredReq = msg
    );

    // fetch data from workspace service
    this.userstories = this._userstoriesservice.getUserStories();

    // trying something here
  //   this.http.post<any>('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
  //       this.postId = data.id;
  //   })

  //   // trying something here
  //   var API = {}

  //   API.countword = function(data){
  //     return $http.post("/countword",{"data":data})
  //   };

  //   return API
  // }
  }

  addUserStoryToPage(enteredReq: HTMLTextAreaElement) {
    console.log("btn click added user story");
    console.log(this.enteredReq)
    this.userStoriesService.readUserStory(this.enteredReq)
    console.log("this.userStoriesService.readUserStory(this.enteredReq): ", this.userStoriesService.readUserStory(this.enteredReq))
  }
}
