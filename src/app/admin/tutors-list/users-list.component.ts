import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../model/turor.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'phone',
    'actions',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  breakpoint: any;

  constructor(
    private tutorService: ServiceService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tutorService.getTutorList().subscribe((data) => {
      if (!data) {
        return;
      }
      this.dataSource = data;
      // this.dataSource = new MatTableDataSource(this.dataSource) ;
      // this.dataSource = new MatTableDataSource<User>(this.dataSource);
      this.breakpoint = window.innerWidth <= 800 ? 1 : 5;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 800 ? 1 : 5;
  }

  onDetail(tutorId: string) {
    this.router.navigate([`/view/${tutorId}`]);
  }
  highlight(row: any, event: any): void {
    console.log(row, event);
  }

  deleteUser(userId: number) {
    this.dataSource = this.dataSource.filter((element: number) => element == userId)
  }
  removeUser(index: number){
    this.dataSource.splice(index, 1);
  }
}
