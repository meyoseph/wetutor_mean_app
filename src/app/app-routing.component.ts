import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "./admin/tutors-list/users-list.component";
import { UserDetailComponent } from "./admin/user-detail/user-detail.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ProfileCreateComponent } from "./profiles/profile-create/profile-create.component";
import { ProfileDetailComponent } from "./profiles/profile-detail/profile-detail.component";
import { ListTutorsComponent } from "./tutors/list-tutors/list-tutors.component";
import { ViewTutorsComponent } from "./tutors/view-tutors/view-tutors.component";

const routes: Routes = [
  {path: '', redirectTo: 'parent', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: ProfileCreateComponent, canActivate: [AuthGuard] },
  {path: 'view/:id', component: ViewTutorsComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: UsersListComponent, canActivate: [AuthGuard]},
  {path:'admin/view/:id/:firstname/:lastname/:gender/:age/:educationlevel/:mainsubject/:language',component:UserDetailComponent, canActivate: [AuthGuard]},
  { path: 'profile/detail/:id', component: ProfileDetailComponent, canActivate: [AuthGuard]},
  {path: 'parent', component: ListTutorsComponent, canActivate: [AuthGuard]} ,
  {path: 'view/:id/:firstname/:lastname/:gender/:age/:educationlevel/:mainsubject/:language', component: ViewTutorsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'parent'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
