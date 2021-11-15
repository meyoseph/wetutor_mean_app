import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';


//mu imports
import {MatSidenavModule} from '@angular/material/sidenav';


import { AppComponent } from './app.component';
import { ProfileCreateComponent } from './profiles/profile-create/profile-create.component';;
import { HeaderComponent } from './header/header.component';
import { ProfileListComponent } from './profiles/profile-list/profile-list.component';
import { AppRoutingModule } from './app-routing.component';

//import { TutorListComponent } from './tutor/tutor-list/tutor-list.component';

//my imports
import { TutorsModule } from './tutors/tutors.module';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileCreateComponent,
    ProfileListComponent,
    //TutorListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,

    
    TutorsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
