import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ProfileCreateComponent } from "./profiles/profile-create/profile-create.component";
import { ListTutorsComponent } from "./tutors/list-tutors/list-tutors.component";
import { ViewTutorsComponent } from "./tutors/view-tutors/view-tutors.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: ProfileCreateComponent, canActivate: [AuthGuard] },
  {path: 'parent', component: ListTutorsComponent} ,
  {path: 'view/:id', component: ViewTutorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
