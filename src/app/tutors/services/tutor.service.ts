import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

   baseUrl: string = 'https://jsonplaceholder.cypress.io/';

  constructor(private http: HttpClient) { }

  listUsers(){
    return this.http.get(this.baseUrl + 'users')
  }

  viewUser(id: string){
    return this.http.get(this.baseUrl + 'users/' + id)
  }

}
