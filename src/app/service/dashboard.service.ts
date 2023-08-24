import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:9091'; 
  private testdata:any
  constructor(private httpClient: HttpClient) { }

  getAllUser(){
    return this.httpClient.get(this.baseUrl+"/api/user/getAllUser");
  }
  getAllPointageAdmin(){
    return this.httpClient.get(this.baseUrl+"/api/pointage/GetAllPointageAdmin");
  }
  getAllPointageAdminByDate(date: string) {
    const params = new HttpParams().set('date', date);
    return this.httpClient.get(this.baseUrl + '/api/pointage/GetAllPointageAdminPerDate', { params: params });
  }
  getAllPointageUser(){
    return this.httpClient.get(this.baseUrl+"/api/pointage/GetAllPointageUser");
  }
  getAllPointageUserByDate(date: string){
    const params = new HttpParams().set('date', date);
    return this.httpClient.get(this.baseUrl + '/api/pointage/GetAllPointageUserPerDate?date='+date);
  }
  setPointage(){
    return this.httpClient.get(this.baseUrl +"/api/pointage/pointer");
  }
  updateStatus(id:any){
    const requestPayload = { id: id };
    return this.httpClient.post(this.baseUrl +"/api/user/update",requestPayload)
  }
  
}
