import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.css']
})
export class BacklogPageComponent implements OnInit {

  projName: string;
  projId: string;
  public allreqs$: any[] = [];

  constructor(
    private _projectService: ProjectService,
    private localStore: LocalStorageService,
  ) { }

  ngOnInit(): void {

    this.projName = this.localStore.getData("currProjName");
    this.projId = this.localStore.getData("currProjId");

    console.log("Project nameeee: ");
    console.log(this.projName);
  }

}
