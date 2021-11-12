import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService{
  private profiles: Profile[] = [];
  private profileUpdated = new Subject<Profile[]>();

  constructor(private http: HttpClient){
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
    image: string,
    cv: string,
    status: string){
      const profile: Profile = {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        age: age,
        educationlevel: educationlevel,
        mainsubject: mainsubject,
        language: language,
        image: image,
        cv: cv,
        status: status
      }
      this.http.post<{ message: string}>('http://localhost:3000/api/profiles', profile).subscribe(
        (res) => {
          console.log(res)
          this.profiles.push(profile);
          this.profileUpdated.next([...this.profiles]);
        }
      );
  }
}
