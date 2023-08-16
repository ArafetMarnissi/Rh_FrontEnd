import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:9091'; 
  constructor(private httpClient: HttpClient) { }

  getAllUser(){
    return this.httpClient.get(this.baseUrl+"/api/user/getAllUser");
  }
}
