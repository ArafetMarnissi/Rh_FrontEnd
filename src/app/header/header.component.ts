import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() pageTitle!: string;

  role:any;
  constructor(private router:Router,private dialog :MatDialog,private ngxService:NgxUiLoaderService){}

  logOut(){
    this.ngxService.start()
    localStorage.clear();
    this.ngxService.stop()
  }

  changePassword(){
      const dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '400px',
        
    });
  }
}
