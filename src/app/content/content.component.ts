import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  componentToShow : string ="welcome";

  constructor(private axiosService: AxiosService){}

  showComponent(componentToShow: string):void{
    this.componentToShow = componentToShow;
  }

  onLogin(input :any):void{
    
    this.axiosService.request(
      "POST",
      "/api/auth/authenticate",{
        email: input.email,
        password: input.password
      },false
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.componentToShow = "messages";
    });
  }
  onRegister(input :any):void{
    this.axiosService.request(
      "POST",
      "/api/auth/register",{
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password
      },false
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.componentToShow = "messages";
    });
  }
  }


