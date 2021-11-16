import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorService } from 'src/app/tutors/services/tutor.service';
@Component({
  selector: 'app-view-tutors',
  templateUrl: './view-tutors.component.html',
  styleUrls: ['./view-tutors.component.css']
})
export class ViewTutorsComponent implements OnInit {

  tutorId: string = '';
  firstname: string = '';
  lastname: string = '';
  gender: string = '';
  age: number = 27;
  educationlevel: string = '';
  mainsubject: string = '';
  language: string = '';
  tutorDetails: any;
  tutorObject: any;

  constructor(private tutorService: TutorService, private avtivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.avtivatedRoute.params.subscribe(data => {
        this.tutorId = data['id'];
        this.firstname = data['firstname'];
        this.lastname = data['lastname'];
        this.gender = data['gender'];
        this.age = data['age'];
        this.educationlevel = data['educationlevel'];
        this.mainsubject = data['mainsubject'];
        this.language = data['language'];
    })

    this.tutorService.viewUser(this.tutorId).subscribe(data=>{
      this.tutorDetails = data;
      this.tutorObject = JSON.stringify(data);
    })
  }

}
