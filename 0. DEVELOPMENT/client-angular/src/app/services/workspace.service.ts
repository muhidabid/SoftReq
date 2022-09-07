import { Injectable } from '@angular/core';
import { response } from 'express';
import { catchError, Observable } from 'rxjs';
import { Workspace } from '../models/workspace';
import { WebRequestService } from './web-request.service';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface WorkspaceModelServerResponse {
  workspaces: Workspace[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  attrib: any;
  // readonly ENDPOINT;

  constructor(private http: HttpClient, private webReqService: WebRequestService) {
    // this.ENDPOINT = "workspaces";
  } // HttpClient is a "dependency" of WorkspaceService

  addWorkspace(name: string, description: string){
    // We want to send a web request to create a list
    return this.webReqService.post('addWorkspace', {name, description});
  }

  getWorkspaces(): Observable<Workspace[]> {
    return this.webReqService.get<WorkspaceModelServerResponse>('getWorkspaces').pipe(map(response => response.workspaces));
  }
}
