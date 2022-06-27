import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace-add-popup',
  templateUrl: './workspace-add-popup.component.html',
  styleUrls: ['./workspace-add-popup.component.css']
})
export class WorkspaceAddPopupComponent implements OnInit {
  enteredWorkspaceName = "";
  enteredWorkspaceDescription = "";
  // @Output() workspaceCreated = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<WorkspaceAddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit(): void {
  }

  closePopup(): void{
    this.dialogRef.close();
  }

  // onCreateWorkspace(){
  //   const newWorkspace = {
  //     name: this.enteredWorkspaceName,
  //     description: this.enteredWorkspaceDescription,
  //     projects: []
  //   };
  //   this.workspaceCreated.emit(newWorkspace);
  // }

  addWorkspace(){
    this.workspaceService.addWorkspace(this.enteredWorkspaceName, this.enteredWorkspaceDescription).subscribe((response: any) =>{
      console.log("added");
      console.log(response);
    });
  }
}
