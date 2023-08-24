import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../service/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  responseMessage: any;

  constructor(public app:AppServiceService,
    private axiosService: AxiosService,
    private router: Router,
    private formBuilder:FormBuilder,
    private ngxService: NgxUiLoaderService,
    private snackBarSer: SnackbarService,
    ){}
  ngOnInit() {
    this.app.affichage=false;

    this.forgotPasswordForm = this.formBuilder.group({
      email : [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]

     })
  }
 
 
 
 
  onSubmitForgotPassword():void{
    if (this.forgotPasswordForm.valid) {
      this.ngxService.start();
    this.axiosService.request(
      "POST",
      "/api/user/forgotPassword",this.forgotPasswordForm.value,false
    ).then(response => {
      this.ngxService.stop();
      this.responseMessage=response.data.message; // Naviguez vers la nouvelle route en cas de succès
    }).catch(error => {
        this.ngxService.stop();
        if (error.response.data.message) {
          this.responseMessage = error.response.data.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBarSer.openSnackBar(this.responseMessage, GlobalConstants.error);
      
      // Afficher un message d'erreur à l'utilisateur ici
    });}else{console.log("erreur de connection");}
  }

  get Email(): FormControl {
    return this.forgotPasswordForm.get("email") as FormControl;
  }
}
