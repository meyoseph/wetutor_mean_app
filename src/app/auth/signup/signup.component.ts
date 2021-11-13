import { Component } from "@angular/core"
import { NgForm } from "@angular/forms"
import { AuthService } from "../auth.service"
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  isLoading: boolean = false;
  constructor(public authService: AuthService){
  }

  ngOnInit(){
  }

  onSignup(form: NgForm){}
}
