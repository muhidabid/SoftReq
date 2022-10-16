import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Project } from '../models/project';
import { Workspace } from '../models/workspace';
import { ProjectService } from '../services/project.service';
import { WorkspaceService } from '../services/workspace.service';
import { ProjectAddPopupComponent } from './project-add-popup/project-add-popup.component';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExecOptionsWithStringEncoding } from 'child_process';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // array holding workspace object
  public workspaces$: Workspace[] = [];
  // private wap: any;
  constructor(private http: HttpClient, private _projectService: ProjectService, private _workspaceService: WorkspaceService, private addProjectPopup: MatDialog) {}

  ngOnInit() {
    // fetch data from workspace service

    this._workspaceService.getWorkspaces().subscribe((response)=>{
      this.workspaces$ = response;
      // Object.assign(this.workspaces, response);
      console.log("Workspaces response (angular): ");
      console.log(response);
      // console.log("Workspaces variable (angular): ");
      // console.log(this.workspaces);
    });
    // console.log("Workspaces variable after (angular): ");
    // console.log(this.workspaces);

  }

  openProjectPopup(workspaceRef: String): void{
    const addPopupRef = this.addProjectPopup.open(ProjectAddPopupComponent, {
      height: '70%',
      width: '36%',
    });

    console.log("Workspace REF: ");
    console.log(workspaceRef.toString());

    addPopupRef.componentInstance.workspaceRef = workspaceRef.toString();

    addPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }

  addProject(): void{

  }

}
