import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Project } from 'src/app/models/project';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  projName: string;
  projId: string;
  // subscription: Subscription;

  constructor(
    public boardService: BoardService,
    private _projectService: ProjectService,
    private localStore: LocalStorageService,
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit called in header");

    // store projName to localStore
    this.projName = this.localStore.getData("currProjName");
    this.projId = this.localStore.getData("currProjId");

    console.log("Project nameeee: ");
    console.log(this.projName);
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called in header");
    this.localStore.removeData("currProjName");
  }

  addList(event: string, position: number) {
    if (event) {
      this.boardService.addList(event, position, this.projId);
    }
  }

  // extract_quality(){
  //   this.boardService.extract_quality(["The look and feel of the page should be nice.", "As a team member, I want to have a schedule of more coworking slots, so that I can work in tandem with the rest of the team on a more regular basis."]);
  //   // after quality concerns are added to the DB
  //   // window.location.reload();
  // }
}
