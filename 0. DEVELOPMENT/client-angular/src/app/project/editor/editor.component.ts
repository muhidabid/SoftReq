import { Component, OnInit } from '@angular/core';
import { UserStories } from 'src/app/models/userstories';
import { UserstoriesService } from 'src/app/services/userstories.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  userstories: UserStories[] = [];

  constructor(private _userstoriesservice: UserstoriesService) {}

  ngOnInit(): void {
    // fetch data from workspace service
    this.userstories = this._userstoriesservice.getUserStories();
  }

}
