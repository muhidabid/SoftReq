import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserstoriesService {

  constructor(private http: HttpClient) { }

  getUserStories(){
    // return this.http.get();
    return [
      {
        req: '111 Some long user story here',
        role: "Customer"
      },
      {
        req: '222 Some long user story here',
        role: "Teacher"
      },
      {
        req: '333 Some long user story here',
        role: "Manager"
      }
      
    ];
  }

}
