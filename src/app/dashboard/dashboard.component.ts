import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceService } from '../service/app-service.service';
import { ValidationService } from '../service/validation.service';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../service/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { AxiosService } from '../axios.service';
import { User } from '../shared/model/user';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  responseMessage:any="hhhhhhhhhhhhhhh";
  data:any;
  userList : User[]= [];
 
  constructor(private dashboardService:DashboardService,
    private axiosService:AxiosService,
    private ngxService: NgxUiLoaderService,
    
    private snackbarService:SnackbarService,
    private userService:UserService,
    private snackBarSer: MatSnackBar,
    public app:AppServiceService,
    public authService :AuthService
    ){
      
    }
    isloggeedIn(){
      return this.authService.isAuthenticated();
    }
  ngOnInit(): void {
    this.app.affichageHome=true
    
  }
    // dashbordData() {
    //   this.axiosService.request(
    //     "GET",
    //     "/api/user/getAllUser",[],true
    //   ).then(response => {
    //     this.userList=response.data;
    //     this.ngxService.stop();
    //   }).catch(error => {
    //       this.ngxService.stop();
    //       if (error.error?.message) {
    //         this.responseMessage = error.error?.message;
    //       }
    //       else {
    //         this.responseMessage = GlobalConstants.genericError;
    //       }
    //       this.snackBarSer.openSnackBar(this.responseMessage, GlobalConstants.error);
    //     this.ngxService.stop();
    //     // Afficher un message d'erreur à l'utilisateur ici
    //   });}
    // }
    
 
  }
   

  

  


