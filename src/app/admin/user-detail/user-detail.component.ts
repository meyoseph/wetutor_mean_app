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
  tutorDetails: any;
  tutorObject: any;

  constructor(private tutorService: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data => {
      this.tutorId = data['id'];
      console.log(data)
  })

  this.tutorService.viewUser(this.tutorId).subscribe(data=>{
    this.tutorDetails = data;
    this.tutorObject = data;
  })
  }
}
