import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls:['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  userType: any;
  private authListenerSub: any;

  constructor(private authService: AuthService){
  }

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getAuth();
    this.authListenerSub = this.authService.getAuthStatusListner().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
      this.userType = this.authService.getUserType();
    });
  }

  ngOnDestroy(){
    this.authListenerSub.unsubscribe();
  }

  onLogOut(){
    this.authService.logout();
  }

  checkUserType(){
    if(this.userType == 'parent'){
      return true;
    }
    return false;
  }
}
