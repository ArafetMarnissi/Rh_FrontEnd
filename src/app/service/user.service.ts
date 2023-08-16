import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9091'; 
  constructor(private httpClient: HttpClient) { }

public login(loginData:any){
return this.httpClient.post(this.baseUrl + '/api/auth/authenticate',loginData);
}

public register(loginData:any){
  return this.httpClient.post(this.baseUrl + '/api/auth/register',loginData);
  }
  
}
