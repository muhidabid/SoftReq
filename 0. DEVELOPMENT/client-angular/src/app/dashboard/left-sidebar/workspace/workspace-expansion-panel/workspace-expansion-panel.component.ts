import { Component, OnInit } from '@angular/core';
import { Workspace } from '../../../../models/workspace'
import { WorkspaceService } from 'src/app/services/workspace.service';
import { HttpResponse } from '@angular/common/http';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-workspace-expansion-panel',
  templateUrl: './workspace-expansion-panel.component.html',
  styleUrls: ['./workspace-expansion-panel.component.css']
})
// export class WorkspaceExpansionPanelComponent implements OnInit {
export class WorkspaceExpansionPanelComponent {
  // array holding workspace object
  db_workspaces: Workspace[] = [];
  workspaces: any[] = [];

  constructor(private workspaceService: WorkspaceService, private projectService: ProjectService) { }

  ngOnInit(): void {
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
