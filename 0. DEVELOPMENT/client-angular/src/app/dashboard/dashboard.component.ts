import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Workspace } from '../models/workspace';
import { WorkspaceService } from '../services/workspace.service';
import { ProjectAddPopupComponent } from './project-add-popup/project-add-popup.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // array holding workspace object
  public workspaces$: Workspace[] = [];
  // private wap: any;
  constructor(
    private http: HttpClient,
    private _workspaceService: WorkspaceService,
    private addProjectPopup: MatDialog,
    private _router: Router,
    private localStore: LocalStorageService,
    ) {}

  ngOnInit() {
    // fetch data from workspace service

    this._workspaceService.getWorkspaces().subscribe((response)=>{
      this.workspaces$ = response;
      console.log("Workspaces response (angular): ");
      console.log(response);
    });
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

  routeToProject(projName: string): void{
    // this._projectService.projectName = projName;
    this.localStore.saveData("currProjName", projName);
    this._router.navigate(['editor', {projName: projName }]);
  }

}
