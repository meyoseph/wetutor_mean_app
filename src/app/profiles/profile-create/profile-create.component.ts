import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProfileService } from "../profile.service";

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent{
  enteredFirstName = ''
  enteredLastName = ''
  enteredAge = ''
  enteredGender = ''
  enteredEducationLevel = ''
  enteredMainSubject = ''
  enteredLanguage = ''
  // enteredImage = ''
  // enteredCv = ''

  constructor(public profileService: ProfileService){}

  onAddProfile(form: NgForm){
    if(form.invalid){
      return;
    }
    this.profileService.addProfile(
      form.value.firstname,
      form.value.lastname,
      form.value.age,
      form.value.gender,
      form.value.educationlevel,
      form.value.mainsubject,
      form.value.language,
      "inactive");
      form.resetForm();
  }
}
