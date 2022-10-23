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
  project$: any;
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

    console.log("Project nameeee: ");
    console.log(this.projName);


    // get from DB this whole project
    this._projectService.getProjectByName(this.projName).subscribe((response)=>{
      this.project$ = response;
      console.log("Projects response (angular): ");
      console.log(response);
      console.log(this.project$);
    });
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called in header");
    this.localStore.removeData("currProjName");
  }

  addColumn(event: string, projectRef: ObjectId, position: number) {
    if (event) {
      this.boardService.addList(event, projectRef, position)
    }
  }

  displayProjectTest(){
    console.log("displayProjectTest called in header comp.");
    // this._projectService.getProjectByName(this.projName).subscribe((response)=>{
    //   this.project$ = response;
    //   console.log("Projects response (angular): ");
    //   console.log(response);
    // });

    return this.project$;
  }
}
