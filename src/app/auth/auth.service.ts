import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthData } from "./auth-data.model";
import { LoginData } from "./login-data.model";
@Injectable({ providedIn: 'root' })
export class AuthService{
  private tokenData: string = '';
  constructor(private http: HttpClient){
  }

  getToken(){
    return this.tokenData;
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
      this.tokenData = token;
    })
  }
}
