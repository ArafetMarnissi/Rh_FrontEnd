import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AxiosService } from '../axios.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../service/app-service.service';
import { GlobalConstants } from '../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../service/snackbar.service';
import { ValidationService } from '../service/validation.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  loginForm:any = FormGroup;
  responseMessage: any="";
  role:any;
  
  @Output() onSubmitLoginEvent = new EventEmitter();

  constructor(public app:AppServiceService,
    private axiosService: AxiosService,
    private router: Router,
    private formBuilder:FormBuilder,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    public validationService:ValidationService,
    public authService : AuthService,
    private userService :UserService
    ){}
  ngOnInit() {

    // this.userService.checkToken().subscribe((response :any)=>{
    //   if (response.message==="true") {
    //     if(this.authService.roleMatch(['ADMIN'])){
    //       this.router.navigateByUrl('userList');
    //     }else
    //     this.router.navigateByUrl('PointageUser');
    //   }
    // },(error:any)=>{
    //   console.log(error);
      
    // })
   if( this.authService.getAuthToken()!=null){
    if(this.authService.roleMatch(['ADMIN'])){
            
      this.router.navigateByUrl('userList'); // Naviguez vers la nouvelle route en cas de succès
     }else{
      this.router.navigateByUrl('PointageUser'); // Naviguez vers la nouvelle route en cas de succès
     }

   }

    // this.axiosService.request(
    //       "GET",
    //       "/api/user/checkToken","",true
    //     ).then(response => {
          
    //        if(this.authService.roleMatch(['ADMIN'])){
            
    //         this.router.navigateByUrl('userList'); // Naviguez vers la nouvelle route en cas de succès
    //        }else{
    //         this.router.navigateByUrl('PointageUser'); // Naviguez vers la nouvelle route en cas de succès
    //        }
           
          
    //     }).catch(error => {
    //         if(error.response.status==403){
    //           return;
    //         }
            
    //         })
    
  
    this.app.affichage=false;

    this.loginForm = this.formBuilder.group({
      email : [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password : [null,[Validators.required,Validators.minLength(8)]],

     })
  }
  onSubmitLogin():void{
    if (this.loginForm.valid) {
    this.ngxService.start();
    this.userService.login(this.loginForm.value
    ).subscribe((response :any )=>{
      this.authService.setAuthToken(response.token);
      this.role=this.authService.decodeToken(response.token);
      this.authService.setRoles(this.role);
      this.ngxService.stop();
      if(this.role==='ADMIN'){
        this.router.navigateByUrl('userList'); // Naviguez vers la nouvelle route en cas de succès
      }else{
        this.router.navigateByUrl('PointageUser'); // Naviguez vers la nouvelle route en cas de succès
      }
    },(error)=>{
      this.ngxService.stop();
      this.responseMessage=error
      console.log(error);
    }
    );
  }
}
      

      

 
 
 
  // onSubmitLogin():void{
  //   if (this.loginForm.valid) {
  // this.ngxService.start();
  //   this.axiosService.request(
  //     "POST",
  //     "/api/auth/authenticate",this.loginForm.value,false
  //   ).then(response => {
  //      this.axiosService.setAuthToken(response.data.token);
  //      console.log(this.authService.decodeToken(response.data.token));
  //      this.role=this.authService.decodeToken(response.data.token);
  //      this.authService.setRoles(this.role);
  //      this.ngxService.stop();
  //      if(this.role==='ADMIN'){
        
  //        this.router.navigate(['/dashboard']); // Naviguez vers la nouvelle route en cas de succès
  //      }else{
  //       this.app.affichageHome=true;
  //       this.router.navigate(['/dashboard']); // Naviguez vers la nouvelle route en cas de succès
  //      }
  //     // this.router.navigate(['/alerts']);
      
  //   }).catch(error => {
  //       this.ngxService.stop();
  //       if (error.error?.message) {
  //         console.log(
  //         this.responseMessage = error.error.message
  //         );}
  //       else {
  //         this.responseMessage = GlobalConstants.genericError;
  //       }
      
      
  //     // Afficher un message d'erreur à l'utilisateur ici
  //   });}else{console.log("erreur de connection");}
  // }

  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

}
