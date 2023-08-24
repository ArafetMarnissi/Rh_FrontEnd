import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { AxiosService } from '../axios.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

import { GlobalConstants } from '../shared/global-constants';
import { User } from '../shared/model/user';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ValidationService } from '../service/validation.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  constructor(public app: AppServiceService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public authService :AuthService
   
    

  ) { 
    
    
  }
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/
  ChangPasswordForm: any = FormGroup;
  responseMessage: any="";
  hideOld=true
  hideNew=true
  hideConfirm=true
  ngOnInit(): void {
        

   this.ChangPasswordForm = this.formBuilder.group({
    oldPassword: ['',[Validators.required]],
    newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    confirmNewPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],

  })
  }


 

  onSubmitChangePassword(){
    if(this.ChangPasswordForm.valid){
      this.ngxService.start();
    this.userService.ChangePassword(this.ChangPasswordForm.value).subscribe((response)=>{
      this.ngxService.stop();
      this.ChangPasswordForm.reset()
      this.responseMessage=response;
      this.responseMessage=this.responseMessage.message
      console.log(this.responseMessage)
    },(error)=>{
      this.responseMessage=error;
      this.ngxService.stop();
    })
  }else{
    this.ngxService.stop();
    this.responseMessage="Formulaire invalide"
  } 
  }

 
  get oldPassword(): FormControl {
    return this.ChangPasswordForm.get("oldPassword") as FormControl;
  }
  get newPassword(): FormControl {
    return this.ChangPasswordForm.get("newPassword") as FormControl;
  }
  get confirmNewPassword(): FormControl {
    return this.ChangPasswordForm.get("confirmNewPassword") as FormControl;
  }
    
  passwordMatchValidator() {


    if (this.ChangPasswordForm.get('newPassword').value != this.ChangPasswordForm.get('confirmNewPassword').value) {
      return true;
    } else {
      return false;
    }
  }
}
