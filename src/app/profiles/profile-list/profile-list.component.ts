import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Profile } from "../profile.model";
import { ProfileService } from "../profile.service";
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['firstname', 'lastname', 'gender', 'status'];
  dataSource: any;
  private profilesSub: any;
  profiles: Profile[] = [];
  constructor(public profileService: ProfileService){
  }

  ngOnInit(){
    this.profileService.getProfiles();
    this.profilesSub = this.profileService.getProfileUpdateListener().subscribe((profiles: Profile[]) => {
      this.profiles = profiles
      this.dataSource = this.profiles;
    });
  }

  ngOnDestroy(){
    this.profilesSub.unsubscribe();
  }
}
