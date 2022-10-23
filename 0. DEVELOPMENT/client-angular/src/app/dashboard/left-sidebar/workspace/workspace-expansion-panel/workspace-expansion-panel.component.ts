import { Component, OnInit } from '@angular/core';
import { Workspace } from '../../../../models/workspace'
import { WorkspaceService } from 'src/app/services/workspace.service';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workspace-expansion-panel',
  templateUrl: './workspace-expansion-panel.component.html',
  styleUrls: ['./workspace-expansion-panel.component.css']
})
// export class WorkspaceExpansionPanelComponent implements OnInit {
export class WorkspaceExpansionPanelComponent {
  // array holding workspace object
  public workspaces$: any[] = [];

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    // fetch data from workspace service
    this._workspaceService.getWorkspaces().subscribe((response)=>{
      this.workspaces$ = response;
    });
  }

}
