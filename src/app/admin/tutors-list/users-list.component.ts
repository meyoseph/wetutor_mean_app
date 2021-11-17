import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'gender',
    'status',
    'actions',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  profiles: any[] = [];
  profilesSub: any;

  constructor(
    private tutorService: ServiceService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  ngOnInit() {
    this.tutorService.getProfiles();
    this.profilesSub = this.tutorService.getProfileUpdateListener().subscribe((profiles: any[]) => {
      this.profiles = profiles
      this.dataSource = this.profiles;
      console.log(this.dataSource );
    });
  }

  onUpdate(userId:string){
    this.tutorService.onUpdate(userId);
  }

  ngOnDestroy(){
    this.profilesSub.unsubscribe();
  }

  onDetail(tutorId: string, firstname: string, lastname: string, gender: string, age: number, educationlevel: string, mainsubject: string, language: string) {
    this.router.navigate([`/admin/view/${tutorId}/${firstname}/${lastname}/${gender}/${age}/${educationlevel}/${mainsubject}/${language}`]);
  }

  deleteUser(userId: number) {
    this.dataSource = this.dataSource.filter((element: number) => element == userId)
  }
  removeUser(index: number){
    this.dataSource.splice(index, 1);
  }
}
