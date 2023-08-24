import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { SnackbarService } from './service/snackbar.service';
import { AppServiceService } from './service/app-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public authService : AuthService,private snack :SnackbarService,public app:AppServiceService,
    private _snackBar: MatSnackBar
    ){}
  ngOnInit(): void {
  }

  openSnack(){
this.snack.openSnackBar("hello","ahemd");
  }


  isLoggedIn(){
  return this.authService.isAuthenticated();
}
  title = 'jwt-RH-Front';




  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{verticalPosition:'top',panelClass: ['custom-snackbar']});
  }
}


