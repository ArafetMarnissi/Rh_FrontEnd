import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private baseUrl = 'http://localhost:9091'; 
  constructor(private httpClient: HttpClient) { }

  validateEmail(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/validate-email?email=${email}`;
    return this.httpClient.get<boolean>(url);
  }
  // checkToken(): Observable<boolean> {
  //   const url = `${this.baseUrl}/api//user/checkToken`;
  //   return this.httpClient.get<boolean>(url);
  // }
  checkToken(){
    return this.httpClient.get(this.baseUrl+"api/user/checkToken");
  }
}
