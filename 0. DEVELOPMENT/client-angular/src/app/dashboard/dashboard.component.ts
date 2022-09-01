import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Project } from '../models/project';
import { Workspace } from '../models/workspace';
import { ProjectService } from '../services/project.service';
import { WorkspaceService } from '../services/workspace.service';
import { ProjectAddPopupComponent } from './project-add-popup/project-add-popup.component';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // array holding workspace object
  db_workspaces: Workspace[] = [];
  workspaces: any[] = [];
  projects: Project[] = [];

  constructor(private addProjectPopup: MatDialog, private projectService: ProjectService, private workspaceService: WorkspaceService) {}

  openProjectPopup(WID:string): void{
    console.log('--> openProjectPopup called in dashboard.component.ts');
    const addPopupRef = this.addProjectPopup.open(ProjectAddPopupComponent, {
      height: '70%',
      width: '36%',
      data:{
        _WID: WID,
      }
    });

    addPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }

  ngOnInit(): void {
    // fetch data from workspace service
    // this.workspaces = this._workspaceService.getWorkspaces<Workspace[]>();
    // fetch data from workspace service
    this.workspaceService.getWorkspaces().subscribe((response:Workspace[]) => {
      this.db_workspaces = response;
      console.log(this.db_workspaces);
      console.log(this.db_workspaces[1].projects[0].toString());

      // make a copy of workspaces from DB
      console.log('Copying workspaces...');
      // this.workspaces = this.db_workspaces;
      this.db_workspaces.forEach(val => this.workspaces.push(Object.assign({}, val)));
      console.log('Copied');

      // replace their IDs with Project objects (project metadata)
      for (let i = 0; i < this.db_workspaces.length; i++) {
        for (let j = 0; j < this.db_workspaces[i].projects.length; j++) {
          console.log('Loop running...');
          this.projectService.getProjectById(this.db_workspaces[i].projects[j].toString()).subscribe((response:Project[]) => {
            this.workspaces[i].projects[j] = response;
            console.log("Project:::::"+response);
          });
        }
      }

      console.log("---WORKSPACES WITH PROJECTS---");
      console.log(this.workspaces);
    });
  }
  }



  // addProject(): void{

  // }

// }
