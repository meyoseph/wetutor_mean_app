import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTutorsComponent } from './list-tutors/list-tutors.component';
import {MatListModule} from '@angular/material/list';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component'
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import {MatIconModule} from '@angular/material/icon'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 

@NgModule({
  declarations: [
    ListTutorsComponent,
    ViewTutorsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatCardModule,
    MatPaginatorModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class TutorsModule { }
