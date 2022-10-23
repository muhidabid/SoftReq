import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import mongoose from 'mongoose';

@Component({
  selector: 'app-project-add-popup',
  templateUrl: './project-add-popup.component.html',
  styleUrls: ['./project-add-popup.component.css']
})
export class ProjectAddPopupComponent implements OnInit {
  workspaceRef = "";
  enteredProjectName = "";
  enteredProjectDescription = "";

  constructor(
    public dialogRef: MatDialogRef<ProjectAddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private projectService: ProjectService,
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
  }

  closePopup(): void{
    this.dialogRef.close();
  }

  addProject(){
    this.projectService.addProject(this.enteredProjectName, this.enteredProjectDescription, this.workspaceRef).subscribe((response: any) =>{
      console.log("project added to projects collection");
      console.log(response);

      // response._id id the id of the newly created project
      // this.workspaceService.addProjectReference(response._id, this.workspaceID).subscribe((response: any) => {
      //   console.log("project reference added to workspace");
      //   console.log(response);
      // });


    });

    window.location.reload();
  }

}
