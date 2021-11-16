import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../tutors.model';
@Injectable({
  providedIn: 'root'
})
export class TutorService {

  baseUrl: string = 'https://jsonplaceholder.cypress.io/';
  private profiles: any[] = [];
  private profileUpdated = new Subject<any[]>();
  constructor(private http: HttpClient) { }

  listUsers(){
    return this.http.get(this.baseUrl + 'users')
  }

  viewUser(id: string){
    return this.http.get(this.baseUrl + 'users/' + id)
  }

  getProfiles(){
    this.http.get<{ result: User[]}>('http://localhost:3000/api/users/tutors').subscribe( (response) => {
      this.profiles = response.result;
      this.profileUpdated.next([...this.profiles]);
    })
  }

  getProfileUpdateListner(){
    return this.profileUpdated.asObservable();
  }
}
