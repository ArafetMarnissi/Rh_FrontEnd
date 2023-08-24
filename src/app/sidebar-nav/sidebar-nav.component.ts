import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { AuthService } from '../service/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit{
  

  constructor(
    public app:AppServiceService,
    public authService : AuthService,
    ){
    }
  ngOnInit(): void {
    
  }
  public isLogedIn(){
    return this.authService.isAuthenticated()
  }

}
