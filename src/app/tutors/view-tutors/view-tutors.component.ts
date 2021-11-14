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
  tutorDetails: any; 
  tutorObject: any;

  constructor(private tutorService: TutorService, private avtivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.avtivatedRoute.params.subscribe(data => {
        this.tutorId = data['id'];
        console.log(data)
    })

    this.tutorService.viewUser(this.tutorId).subscribe(data=>{
      this.tutorDetails = data;
      this.tutorObject = JSON.stringify(data);
    })
  }

}
