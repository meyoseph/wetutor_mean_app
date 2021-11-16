import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "./admin/tutors-list/users-list.component";
import { UserDetailComponent } from "./admin/user-detail/user-detail.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: 'admin', component: UsersListComponent},
  {path:'view/:id',component:UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
