import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import jwt_decode from "jwt-decode";

import { AuthData } from "./auth-data.model";
import { LoginData } from "./login-data.model";
@Injectable({ providedIn: 'root' })
export class AuthService{
  private tokenTimer: any;
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

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return;
    }
    const now = new Date();
    if(authInfo != undefined){
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if(expiresIn > 0){
        this.tokenData = authInfo.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListner.next(true);
      }
    }
  }

  login(email: string, password: string){
    const loginData: LoginData = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number }>('http://localhost:3000/api/users/login', loginData).subscribe((response) => {
      const token = response.token;
      if(token){
        this.setAuthTimer(response.expiresIn);
        const decodedToken: any = jwt_decode(token);
        this.tokenData = token;
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(token, expirationDate)
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
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
