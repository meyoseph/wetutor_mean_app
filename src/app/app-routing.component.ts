import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ListTutorsComponent } from "./tutors/list-tutors/list-tutors.component";
import { ViewTutorsComponent } from "./tutors/view-tutors/view-tutors.component";
//import { TutorListComponent } from "./tutor/tutor-list/tutor-list.component";

const routes: Routes = [
  {path: '', 
    children: [
      {path: '', component: ListTutorsComponent} ,
      {path: 'view/:id', component: ViewTutorsComponent}
  ]}
  //{ path: '', component: TutorListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
