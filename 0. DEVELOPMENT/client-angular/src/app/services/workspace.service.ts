import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Workspace } from '../models/workspace';
import { Project } from '../models/project';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  // readonly ENDPOINT;
  workspaces: Workspace[] = [];

  constructor(private webReqService: WebRequestService) {
    // this.ENDPOINT = "workspaces";
  } // HttpClient is a "dependency" of WorkspaceService

  // initialize(){
  //   return this.webReqService.get<Workspace[]>('getWorkspaces');
  // }

  addProject(w_id: string, p_id: string){
    return this.webReqService.post('addProjectRefToWorkspace', {w_id, p_id});
  }

  addWorkspace(name: string, description: string){
    // We want to send a web request to create a list
    return this.webReqService.post('addWorkspace', {name, description});
  }

  getWorkspaces(){
    return this.webReqService.get<Workspace[]>('getWorkspaces').pipe(shareReplay(1));
    // // if (this.workspaces.length === 0){
    //   console.log('Initializing workspace array...');
    //   this.initialize().subscribe((response:Workspace[]) => {
    //       this.workspaces = response;
    //   });
    // // }
    // console.log('Returning workspaces...');
    // return this.workspaces;

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
