import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Project } from '../models/project';
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

// export interface ProjectModelServerResponse {
//   project: Project;
// }

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectName: string;  // name of current project user is on

  constructor(private webReqService: WebRequestService) {}

  addProject(name: string, description: string, workspaceRef: string){
    // We want to send a web request to create a list
    return this.webReqService.post('addProject', {name, description, workspaceRef});
  }

  editProject(name: string, description: string, projRef: string){
    return this.webReqService.post('editProject', {name, description, projRef});
  }

  deleteProj(projRef: string){
    return this.webReqService.post('deleteProj', {projRef});
  }

  getProjectByName(name: string){
    console.log("getProjectByName called in proj service");
    console.log(name);

    return this.webReqService.post<Project>('getProjectByName', { name });
  }
}
