import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http: HttpClient) { } // HttpClient is a "dependency" of WorkspaceService

  getWorkspaces(){
    return this.http.get();
    // return [
    //   {
    //     name: 'Home workspace',
    //     description: "Xyz 123 brooo",
    //     projects: [{name:'test'}]
    //   },
    //   {
    //     name: 'Not Home workspace',
    //     description: "Xyz 123 description brooo",
    //     projects: [{name:'test'},{name:'test'},{name:'not test'}]
    //   },
    // ];
  }
}
