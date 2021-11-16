import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProfileService{
  private profiles: Profile[] = [];
  private profileUpdated = new Subject<Profile[]>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){
  }

  getProfiles(){
    this.http.get<{message: string, profiles: Profile[]}>('http://localhost:3000/api/profiles')
    .subscribe((profileData) => {
      this.profiles = profileData.profiles;
      this.profileUpdated.next([...this.profiles])
    });
  }

  getProfileUpdateListener(){
    return this.profileUpdated.asObservable();
  }

  addProfile(
    firstname: string,
    lastname: string,
    gender: string,
    age: number,
    educationlevel: string,
    mainsubject: string,
    language: string,
    status: string){
      const profile: Profile = {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        age: age,
        educationlevel: educationlevel,
        mainsubject: mainsubject,
        language: language,
        status: status
      }
      const userId = this.authService.getUserId();
      console.log(userId)
      this.http.post<{ message: string}>(`http://localhost:3000/api/profiles/${userId}`, profile).subscribe(
        (res) => {
          this.profiles.push(profile);
          this.profileUpdated.next([...this.profiles]);
          this.router.navigate([`/profile/detail/${userId}`]);
        }
      );
  }
}
