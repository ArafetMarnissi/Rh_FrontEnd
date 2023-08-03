import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = "http://localhost:9091"
    axios.defaults.headers.post["Content-Type"]="application/json"
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


   request(method: string, url: string, data: any,includeAuthHeaders: boolean = true): Promise<any>{
    let headers ={};
    
    if(includeAuthHeaders && this.getAuthToken()!== null){
      headers = {"Authorization":"Bearer " + this.getAuthToken()};
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
   }
}
