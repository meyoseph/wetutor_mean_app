import { Component, OnInit } from '@angular/core';
import { TutorService } from 'src/app/tutors/services/tutor.service';

@Component({
  selector: 'app-list-tutors',
  templateUrl: './list-tutors.component.html',
  styleUrls: ['./list-tutors.component.css']
})
export class ListTutorsComponent implements OnInit {


  filteredString: string = '';




  listTutors : any;
  constructor(private tutorService: TutorService) { }

  ngOnInit(): void {
    this.tutorService.listUsers().subscribe(data =>{
      this.listTutors = data;
     });

  }

}
