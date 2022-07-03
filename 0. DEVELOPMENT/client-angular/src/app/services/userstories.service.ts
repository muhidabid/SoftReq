import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoriesService {

  private userStoryList = new BehaviorSubject('"As a _____, I want to ___________"')
  currentUserStory = this.userStoryList.asObservable();

  constructor(private http: HttpClient, private webReqService: WebRequestService) { }

  // addUserStory(req: string){
  //   // We want to send a web request to create a list
  //   return this.webReqService.post('addUserStory', {req});
  // }

  readUserStory(req: string){
    console.log('userStoryList: ', this.userStoryList)
    console.log('currentUserStory: ', this.currentUserStory)
    console.log('userStoryList.next: ', this.userStoryList.next)
    console.log('userStoryList.value: ', this.userStoryList.value)
    return this.userStoryList.next(req)
    // return this.userStoryList.value
  }

  sendUserStoryToPython(req: string){

  }

  getUserStories(){
    // return this.http.get(this.readUserStory);
    return [
      {
        req: '111 Some long user story here',
      },
      {
        req: '222 Some long user story here',
      },
      {
        req: '333 Some long user story here',
      }
      
    ];
  }

}
