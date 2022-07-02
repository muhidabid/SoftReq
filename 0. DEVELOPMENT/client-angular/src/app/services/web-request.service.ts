// This service is simply to wrap all of our request methods
// to make it a bit neater and provile the ROOT_URL as a constant
// and use it in the requests and then return the observables
// these HTTP methods return.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workspace } from '../models/workspace';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get<T>(uri: string) {
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
