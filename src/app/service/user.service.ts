import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9091'; 


  constructor(private httpClient: HttpClient) { }

public login(loginData:any){
return this.httpClient.post(this.baseUrl + '/api/auth/authenticate',loginData,
{headers:new HttpHeaders().set('Content-Type','application/json')});
}

public register(loginData:any){
  return this.httpClient.post(this.baseUrl + '/api/auth/register',loginData,
  {headers:new HttpHeaders().set('Content-Type','application/json')});
  }
public changePassword(data:any){
  return this.httpClient.post(this.baseUrl + '/api/user/changePassword',data,
  {headers:new HttpHeaders().set('Content-Type','application/json')});
}

public checkToken() {
  return this.httpClient.get(this.baseUrl + '/api/user/checkToken');
}

public getUserDetails(id:any) {
  return this.httpClient.get(this.baseUrl + '/api/user/getUserById?userId='+id);
}
public updateProfileUser(data:any){
  return this.httpClient.post(this.baseUrl + '/api/user/updateProfile',data);
}
public getCurrentUser(){
  return this.httpClient.get(this.baseUrl + '/api/user/getCurrentUser');
}
public ChangePassword(data:any){
  return this.httpClient.post(this.baseUrl + '/api/user/changePassword',data);
}

}
