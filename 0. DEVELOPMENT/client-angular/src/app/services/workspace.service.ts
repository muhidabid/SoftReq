import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http: HttpClient) { } // HttpClient is a "dependency" of WorkspaceService

  getWorkspaces(){
    // return this.http.get();
    return [
      {
        name: 'Home workspace',
        description: "Xyz 123",
        projects: [{name:'Welcome Project!'}]
      },
      {
        name: 'Client ABC',
        description: "Xyz 987 description",
        projects: [{name:'Mobile app'},{name:'Web app'},{name:'Web app 2'}]
      },
      {
        name: 'XYZ Work',
        description: 'Some random description here',
        projects: [{name: 'FrontEnd X'}, {name: 'Backend Y'}]
      }
    ];
  }
}
