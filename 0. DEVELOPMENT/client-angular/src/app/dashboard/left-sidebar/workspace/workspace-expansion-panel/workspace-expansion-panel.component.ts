import { Component, OnInit } from '@angular/core';
import { Workspace } from '../../../../models/workspace'
import { WorkspaceService } from 'src/app/services/workspace.service';
import { HttpResponse } from '@angular/common/http';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';

@Component({
  selector: 'app-workspace-expansion-panel',
  templateUrl: './workspace-expansion-panel.component.html',
  styleUrls: ['./workspace-expansion-panel.component.css']
})
// export class WorkspaceExpansionPanelComponent implements OnInit {
export class WorkspaceExpansionPanelComponent {
  // array holding workspace object
  workspaces: Workspace[] = [];

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    // fetch data from workspace service
    this._workspaceService.getWorkspaces().subscribe((response:Workspace[]) => {
      this.workspaces = response
    });
  }

}
