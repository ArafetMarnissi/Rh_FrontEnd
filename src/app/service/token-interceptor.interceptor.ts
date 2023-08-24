import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private authService :AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken() ;
    if(token){
      request=this.addToken(request,token);
    }
    return next.handle(request).pipe(catchError((err:HttpErrorResponse)=>{
      
        console.log(err.status);
        if(err.status === 401){
          alert("UNAUTHORIZED");
          localStorage.clear();
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          alert("forbiden access");
          localStorage.clear();
          this.router.navigate(['/login']);
        }else if(err.status === 400 ){
          return throwError(err.error.message);
        } 
      
      return throwError("Something is Wrong");
    })
    )
  }
  private addToken(request:HttpRequest<any>,token:string){
    return request.clone(
      {
        setHeaders: {
          Authorization : `Bearer ${token}`
        }
      }
    );
  }
}
