import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-edit-popup',
  templateUrl: './project-edit-popup.component.html',
  styleUrls: ['./project-edit-popup.component.css']
})
export class ProjectEditPopupComponent implements OnInit {
  proj;
  enteredProjectName = "";
  enteredProjectDescription = "";

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.enteredProjectName = this.proj.name;
    this.enteredProjectDescription = this.proj.description;
  }

  editProject(){
    this.projectService.editProject(this.enteredProjectName, this.enteredProjectDescription, this.proj._id).subscribe((response: any) =>{
      console.log("project edited");
      console.log(response);
    });

    window.location.reload();
  }

}
