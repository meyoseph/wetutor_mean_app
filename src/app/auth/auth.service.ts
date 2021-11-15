import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import jwt_decode from "jwt-decode";

import { AuthData } from "./auth-data.model";
import { LoginData } from "./login-data.model";
@Injectable({ providedIn: 'root' })
export class AuthService{
  isAuthenticated = false;
  private tokenData: string = '';
  private authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }

  getToken(){
    return this.tokenData;
  }

  getAuth(){
    return this.isAuthenticated;
  }

  createUser(email: string, password: string, phonenumber: string, userType: string){
    const authData: AuthData = { email: email, password: password, phonenumber: phonenumber, userType: userType };
    this.http.post('http://localhost:3000/api/users/signup', authData).subscribe(response => {
      console.log(response)
    })
  }

  login(email: string, password: string){
    const loginData: LoginData = { email: email, password: password }
    this.http.post<{ token: string }>('http://localhost:3000/api/users/login', loginData).subscribe((response) => {
      const token = response.token;
      if(token){
        const decodedToken: any = jwt_decode(token);
        this.tokenData = token;
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        if(decodedToken.userType == "tutor"){
          this.router.navigate(['/profile'])
        }
        if(decodedToken.userType == "parent"){
          this.router.navigate(['/parent'])
        }
      }
    })
  }

  logout(){
    this.tokenData = '';
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
  }
}
