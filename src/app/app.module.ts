import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';


//mu imports
import {MatSidenavModule} from '@angular/material/sidenav';


import { AppComponent } from './app.component';
import { ProfileCreateComponent } from './profiles/profile-create/profile-create.component';;
import { HeaderComponent } from './header/header.component';
import { ProfileListComponent } from './profiles/profile-list/profile-list.component';
import { AppRoutingModule } from './app-routing.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthInterceptor } from './auth/auth-interceptor';
import { FooterComponent } from './footer/footer.html';


import { TutorsModule } from './tutors/tutors.module';
import {MatListModule} from '@angular/material/list';
import { UsersListComponent } from './admin/tutors-list/users-list.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { AngularMaterialModule } from './material/material.module';
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileCreateComponent,
    ProfileListComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    UsersListComponent,
    UserDetailComponent,
    ProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TutorsModule,
    AngularMaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
