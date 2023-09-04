import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { AxiosService } from '../axios.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../service/validation.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit{
  constructor(public app: AppServiceService,
    private axiosService: AxiosService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    public authService :AuthService,
    private router :Router
   
    

  ) { 
    
    
  }
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/
  NewPasswordForm: any = FormGroup;
  responseMessage: any="";
  hideConfirm=true
  hideNew=true
  token:any;
  validity:any
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      localStorage.clear()
    }

    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
          this.token=token;
          console.log('Token récupéré :', token);
          
      } else {
          console.log('Aucun token trouvé dans l\'URL.');
      }
  });
        

   this.NewPasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    confirmNewPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],

  })
  }



 

  onSubmitChangePassword(){
    if (this.NewPasswordForm.valid ) {


      this.ngxService.start();
      const credentials = this.NewPasswordForm.value;

      this.axiosService.requestByincludeHeaders(
        "POST",
        "/api/user/createNewPassword", credentials, true,this.token
      ).then(response => {
        this.responseMessage=response.data.message;
        this.ngxService.stop();
        this.NewPasswordForm.reset()
        // console.log(response);
        
        //this.router.navigateByUrl('/login');
    
      }, (error) => {
        this.ngxService.stop();
        this.NewPasswordForm.reset();
         console.log(error);
        if (error.response.status=="403") {
          this.responseMessage="this link is expired ! try again"
        }else{
        this.responseMessage=error.response.data.message
        }
        

      });
    }else{
      console.log("erreur de connection");
    }
    
  }

 

  get newPassword(): FormControl {
    return this.NewPasswordForm.get("newPassword") as FormControl;
  }
  get confirmNewPassword(): FormControl {
    return this.NewPasswordForm.get("confirmNewPassword") as FormControl;
  }
    
  passwordMatchValidator() {


    if (this.NewPasswordForm.get('newPassword').value != this.NewPasswordForm.get('confirmNewPassword').value) {
      return true;
    } else {
      return false;
    }
  }
  
}
