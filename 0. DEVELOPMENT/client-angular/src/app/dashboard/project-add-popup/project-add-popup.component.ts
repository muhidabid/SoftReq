import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-project-add-popup',
  templateUrl: './project-add-popup.component.html',
  styleUrls: ['./project-add-popup.component.css']
})
export class ProjectAddPopupComponent implements OnInit {
  enteredProjectName = "";
  enteredProjectDescription = "";


  constructor(
    public dialogRef: MatDialogRef<ProjectAddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private projectService: ProjectService,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit(): void {
  }

  closePopup(): void{
    this.dialogRef.close();
  }

  addProject(){
    this.projectService.addProject(this.enteredProjectName, this.enteredProjectDescription).subscribe((response: any) =>{
      console.log("added");
      console.log(response);

      this.workspaceService.addProject(response._id).subscribe((response: any)=>{
        console.log(response);
      });
    });
  }
}
