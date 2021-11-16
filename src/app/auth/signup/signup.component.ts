import { Component } from "@angular/core"
import { NgForm } from "@angular/forms"
import { AuthService } from "../auth.service"
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  userType: string = "";
  userTypes: string[] = ['parent', 'tutor'];
  isLoading: boolean = false;
  constructor(public authService: AuthService){
  }

  ngOnInit(){
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.email,
      form.value.password,
      form.value.phonenumber,
      this.userType
    );
  }
}
