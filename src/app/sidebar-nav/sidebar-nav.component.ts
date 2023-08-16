import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit{
  constructor(public app:AppServiceService,public authService : AuthService){}
  ngOnInit(): void {
    
  }
  public isLogedIn(){
    return this.authService.isAuthenticated()
  }

}
