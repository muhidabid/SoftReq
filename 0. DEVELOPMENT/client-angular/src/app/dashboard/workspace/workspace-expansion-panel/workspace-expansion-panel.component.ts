import { Component, OnInit } from '@angular/core';
import { Workspace } from '../../../workspace'

@Component({
  selector: 'app-workspace-expansion-panel',
  templateUrl: './workspace-expansion-panel.component.html',
  styleUrls: ['./workspace-expansion-panel.component.css']
})
// export class WorkspaceExpansionPanelComponent implements OnInit {
export class WorkspaceExpansionPanelComponent {
  workspaces: Workspace[] = [
    {
      name: 'Home workspace',
      projects: []
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
