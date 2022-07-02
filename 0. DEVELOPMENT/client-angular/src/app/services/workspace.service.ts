import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Workspace } from '../models/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  // readonly ENDPOINT;

  constructor(private webReqService: WebRequestService) {
    // this.ENDPOINT = "workspaces";
  } // HttpClient is a "dependency" of WorkspaceService

  addProject(p_id: string){
    return this.webReqService.post('addProject', {p_id});
  }

  addWorkspace(name: string, description: string){
    // We want to send a web request to create a list
    return this.webReqService.post('addWorkspace', {name, description});
  }

  getWorkspaces(){
    return this.webReqService.get<Workspace[]>('getWorkspaces');
    // return [
    //   {
    //     name: 'Home workspace',
    //     description: "Xyz 123",
    //     projects: [{name:'Welcome Project!'}]
    //   },
    //   {
    //     name: 'Client ABC',
    //     description: "Xyz 987 description",
    //     projects: [{name:'Mobile app'},{name:'Web app'},{name:'Web app 2'}]
    //   },
    //   {
    //     name: 'XYZ Work',
    //     description: 'Some random description here',
    //     projects: [{name: 'FrontEnd X'}, {name: 'Backend Y'}]
    //   }
    // ];
  }
}
