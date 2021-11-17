import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  tutorId: any;
  firstname: string = '';
  lastname: string = '';
  gender: string = '';
  age: number = 27;
  educationlevel: string = '';
  mainsubject: string = '';
  language: string = '';
  tutorDetails: any;
  tutorObject: any;

  constructor(private tutorService: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data => {
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
    this.tutorObject = data;
  })
  }
}
