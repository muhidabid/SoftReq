import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private webReqService: WebRequestService) {}

  addProject(name: string, description: string, workspaceRef: String){
    // We want to send a web request to create a list
    return this.webReqService.post('addProject', {name, description, workspaceRef});
  }
}
