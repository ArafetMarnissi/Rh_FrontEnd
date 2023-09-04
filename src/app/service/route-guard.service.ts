import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwtDecode from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    
      if (this.authService.getAuthToken() !== null) {
        const roles = route.data["roles"] as string[];
        if (roles && roles.length > 0) {
          const match = this.authService.roleMatch(roles);
          if (match) {
            return true;
          } else {
            alert("Forbiden Access !");
           // this.router.navigate(['/login']);
            return false;
          }
        }
      }
      this.router.navigate(['/login']);
      return false;
    
  //   const expectedRoleArray = route.data['expectedRole']; // Corrected access to expectedRoleArray
  //   const token: any = localStorage.getItem('auth_token');

  //   let tokenPayload: any;
  //   try {
  //     tokenPayload = jwtDecode(token);
  //   } catch (err) {
  //     localStorage.clear();
  //     this.router.navigate(['login']);
  //     return false; // Added return statement
  //   }

  //   let expectedRoleFound = false; // Added a flag to track expected role match
  //   for (let i = 0; i < expectedRoleArray.length; i++) { // Corrected length() to length
  //     if (expectedRoleArray[i] === tokenPayload.role) { // Comparing with tokenPayload.role
  //       expectedRoleFound = true;
  //       break; // No need to continue loop if match is found
  //     }
  //   }

  //   if ((tokenPayload.role === 'COLLABORATEUR' || tokenPayload.role === 'ADMIN') && expectedRoleFound) {
  //     if (this.auth.isAuthenticated() && tokenPayload.role === expectedRoleArray) {
  //       return true;
  //     }
  //     this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
  //     this.router.navigate(['dashboard']);
  //     return false;
  //   } else {
  //     this.router.navigate(['login']);
  //     localStorage.clear();
  //     return false;
  //   }
  }
}
