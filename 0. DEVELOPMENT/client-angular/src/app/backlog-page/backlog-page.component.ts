import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpClient } from '@angular/common/http';

import { UserStories } from 'src/app/models/userstories';
import { UserstoriesService } from 'src/app/services/userstories.service';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.css']
})
export class BacklogPageComponent implements OnInit {

  projName: string;
  projId: string;
  userstories: UserStories[] = [];

  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();

  commentInput = ''
  open = false;

  public allreqs$: any[] = [];
  
  
  constructor(
    private _projectService: ProjectService,
    private localStore: LocalStorageService,
    private _userstoriesservice: UserstoriesService,
    private userStoriesService: UserstoriesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.projName = this.localStore.getData("currProjName");
    this.projId = this.localStore.getData("currProjId");

    console.log("Project nameeee: ");
    console.log(this.projName);

    this.userstories = this._userstoriesservice.getUserStories();
  }

  onOpenComment() {
    console.log('opening ')
    this.open = !this.open
  }

  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }


  onCardItemEmit(card: any, increase: boolean) {
    console.log('emitting ')
    this.emitCardItem.emit({ card, increase });
  }
  

}
