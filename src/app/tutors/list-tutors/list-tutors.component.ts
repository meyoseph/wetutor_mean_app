import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/tutors/services/tutor.service';
import { User } from '../tutors.model';

@Component({
  selector: 'app-list-tutors',
  templateUrl: './list-tutors.component.html',
  styleUrls: ['./list-tutors.component.css']
})
export class ListTutorsComponent implements OnInit, OnDestroy {

  filteredString: string = '';
  listTutors: User[] = [];
  breakpoint : any;
  profileUpdateSub: any;
  profiles: User[] = [];

  constructor(private tutorService: TutorService, private router: Router) { }

  ngOnInit(): void {
    this.tutorService.getProfiles()
    this.profileUpdateSub = this.tutorService.getProfileUpdateListner().subscribe((response: User[]) => {
      this.listTutors = response
    })

     this.breakpoint = (window.innerWidth <= 800) ? 1 : 5;
  }

  ngOnDestroy(){
    this.profileUpdateSub.unsubscribe();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 5;
  }

  onDetail(tutorId:string, firstname: string, lastname: string, gender: string, age: number, educationlevel: string, mainsubject: string, language: string){
    this.router.navigate([`/view/${tutorId}/${firstname}/${lastname}/${gender}/${age}/${educationlevel}/${mainsubject}/${language}`])
  }

  onSearch(filterValue:any){
    console.log("am called")
    const term = filterValue.target.value;
    this.tutorService.searchProfiles(term);
    this.profileUpdateSub = this.tutorService.getProfileUpdateListner().subscribe((response: User[]) => {
      this.listTutors = response
    })
  }
}
