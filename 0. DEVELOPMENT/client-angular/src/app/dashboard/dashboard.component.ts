import { Component, Input, OnInit } from '@angular/core';
import { Workspace } from '../models/workspace';
import { WorkspaceService } from 'src/app/services/workspace.service';


@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // array holding workspace object
  workspaces: Workspace[] = [];

  constructor(private _workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    // fetch data from workspace service
    this.workspaces = this._workspaceService.getWorkspaces();
  }



}
