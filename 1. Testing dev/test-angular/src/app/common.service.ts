import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';   // deprecated
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { tap } from 'rxjs';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {}

  saveUser(user){
    return this.http.post('http://localhost:8080/api/SaveUser/', user).map((response: Response) =>response.json())
  }
  GetUser(){
    return this.http.get('http://localhost:8080/api/getUser/').map((reponse: Response)=>response.json())
  }
  deleteUser(id){
    return this.http.post('http://localhost:8080/api/deleteUser/',{'id':id}).map((response: Response) =>response.json())
  }
}
