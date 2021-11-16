import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from './model/turor.model'

@Injectable({
  providedIn: 'root' 
})
export class ServiceService {
  baseUrl: string = 'https://jsonplaceholder.cypress.io/';
  constructor(private http: HttpClient) { }


  getTutorList():Observable<User>{
    return this.http.get<User>(this.baseUrl + 'users')
  }
  viewUser(id: string){
    return this.http.get(this.baseUrl + 'users/' + id)
  }
  
}
