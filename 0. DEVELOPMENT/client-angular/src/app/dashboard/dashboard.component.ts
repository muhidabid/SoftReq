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
  workspaces: Workspace[] = [];
  projects: Project[] = [];

  constructor(private _projectService: ProjectService, private _workspaceService: WorkspaceService, private addProjectPopup: MatDialog) {}

  ngOnInit(): void {
    // fetch data from workspace service
    // this.workspaces = this._workspaceService.getWorkspaces<Workspace[]>();
  }

  openProjectPopup(): void{
    const addPopupRef = this.addProjectPopup.open(ProjectAddPopupComponent, {
      height: '70%',
      width: '36%',
    });

    addPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }

  addProject(): void{

  }

}
