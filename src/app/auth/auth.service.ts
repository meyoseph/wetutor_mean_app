import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import jwt_decode from "jwt-decode";
import {MatSnackBar} from '@angular/material/snack-bar';

import { AuthData } from "./auth-data.model";
import { LoginData } from "./login-data.model";
@Injectable({ providedIn: 'root' })
export class AuthService{
  userId: string = '';
  userType: string = '';
  isAuthenticated = false;
  private tokenTimer: any;
  private tokenData: string = '';
  private authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar){
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
    this.http.post<{ email: string, password: string }>('http://localhost:3000/api/users/signup', authData).subscribe(response => {
      this.login(email, password)
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  login(email: string, password: string){
    const loginData: LoginData = { email: email, password: password }
    this.http.post<{
      token: string,
      expiresIn: number,
      userId: string,
      userType: string
     }>('http://localhost:3000/api/users/login', loginData).subscribe((response) => {
      const token = response.token;
      if(token){
        console.log(response)
        this.setAuthTimer(response.expiresIn);
        this.userId = response.userId;
        this.userType = response.userType;
        this.tokenData = token;
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(token, expirationDate, this.userId, this.userType);
        if(response.userType == "tutor"){
          this.router.navigate(['/profile'])
          this.openSnackBar('Logged in', 'Dismiss')
        }
        if(response.userType == "parent"){
          this.router.navigate(['/parent'])
          this.openSnackBar('Logged in', 'Dismiss')
        }
        if(response.userType == "admin"){
          this.router.navigate(['/admin']);
          this.openSnackBar('Logged in', 'Dismiss')
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
    this.openSnackBar('Logged out', 'Dismiss')
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userType: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType)
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userType: userType
    }
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  getUserType(){
    return localStorage.getItem("userType");
  }
}
