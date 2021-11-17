import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {User} from './model/turor.model'
import { TutorProfile } from './model/tutor-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl: string = 'http://localhost:3000/api/profiles/';
  private users: any[] = [];
  private profileUpdated = new Subject<TutorProfile[]>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){
  }

  getProfiles(){
  this.http.get<{message: string, users: any[]}>('http://localhost:3000/api/admin/tutors')
    .subscribe((profileData) => {
      this.users = profileData.users;
      this.profileUpdated.next([...this.users])
    });
  }

  getProfileUpdateListener(){
    return this.profileUpdated.asObservable();
  }
  viewUser(id: string){
    return this.http.get(this.baseUrl + 'users/' + id)
  }

  onUpdate(userId:string){
    console.log(userId);
    this.http.put(`http://localhost:3000/api/admin/tutors/${userId}`, {}).subscribe(() => {
      this.getProfiles();
    })
  }


}
