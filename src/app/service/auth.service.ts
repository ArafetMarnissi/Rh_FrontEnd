import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from './user.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userServices :UserService) { }

  public setRoles(role :any){
    localStorage.setItem('role',role);
  }
  public getRoles(): string | null {
    const rolesString = this.decodeToken(this.getAuthToken());
    
    if (rolesString) {
      return rolesString;
      }
    else 
    return null;
    }
    
  

  public isAuthenticated():boolean{
      if(this.getAuthToken()!==null){
        return true;
        
      }
      return false;
  }
  public decodeToken(token:any):string|null{

    const decodedToken :any = jwt_decode(token);

    if (decodedToken && decodedToken.role) {
      const role = decodedToken.role;
      return role;
    } else {
      return null;
    }
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
  setAuthToken(token :string | null):void{
    if (token !== null){
      window.localStorage.setItem("auth_token", token);
    }
    else{
      window.localStorage.removeItem("auth_token");
    }
  }
  refreshAuthToken(newToken: string): void {
    if (newToken !== null) {
      this.setAuthToken(newToken);
    }
  }
  checkToken(): boolean{
    if (this.userServices.checkToken()) {
      return true;
      
    }
    return false;
  }
 
  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: string | null = this.getRoles();
    
    if (userRoles !== null) {
      return allowedRoles.includes(userRoles);
    }

    return false;
  }

}
