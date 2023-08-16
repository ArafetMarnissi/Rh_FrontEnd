import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public authService : AuthService){}
  ngOnInit(): void {
  }
  isLoggedIn(){
  return this.authService.isAuthenticated();
}
  title = 'jwt-RH-Front';
}
