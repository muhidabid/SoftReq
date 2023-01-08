import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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

  data:any;

  

  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();

  commentInput = ''
  open = false;

  public userstories$: any[] = [];
  
  ownedAnimals = [
    "Dog", "Cat", "Fish", "turtle"
  ];

  otherAnimals = [
    "tiger", "lion", "monkey"
  ];
  
  constructor(
    private _projectService: ProjectService,
    private localStore: LocalStorageService,
    private _userstoriesservice: UserstoriesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.data = this._projectService.getData();

    this.projName = this.localStore.getData("currProjName");
    this.projId = this.localStore.getData("currProjId");

    console.log("Project nameeee: ");
    console.log(this.projName);
    console.log("Project ID: ");
    console.log(this.projId)

    this.userstories = this._userstoriesservice.getUserStories();

    // fetch data from workspace service

    // this._userstoriesservice.getUserStories().subscribe((response)=>{
    //   this.userstories$ = response;
    //   console.log("Workspaces response (angular): ");
    //   console.log(response);
    // });
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

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     console.log("moveItemInArray: ");
  //     console.log(event);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //     console.log("transferArrayItem: ");
  //     console.log(event);
  //   }

  //   this.boardService.updateBoard(this.board$);
  // }

  drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log("moveItemInArray: ");
        console.log(event);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
        console.log("transferArrayItem: ");
        console.log(event);
      }
    }

}
