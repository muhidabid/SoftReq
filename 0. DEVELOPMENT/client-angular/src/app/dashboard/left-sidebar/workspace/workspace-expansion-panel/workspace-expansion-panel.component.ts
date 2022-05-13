import { Component, OnInit } from '@angular/core';
import { Workspace } from '../../../../workspace'
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace-expansion-panel',
  templateUrl: './workspace-expansion-panel.component.html',
  styleUrls: ['./workspace-expansion-panel.component.css']
})
// export class WorkspaceExpansionPanelComponent implements OnInit {
export class WorkspaceExpansionPanelComponent {
  workspaces: Workspace[] = [
    // {
    //   name: 'Home workspace',
    //   description: "Xyz 123 brooo",
    //   projects: [{name:'test'}]
    // },
    // {
    //   name: 'Not Home workspace',
    //   description: "Xyz 123 description brooo",
    //   projects: [{name:'test'},{name:'test'},{name:'not test'}]
    // },
  ];

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    this.workspaces = this._workspaceService.getWorkspaces();
  }

}
