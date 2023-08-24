import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(public app: AppServiceService,
    private axiosService: AxiosService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private validationService:ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any
    

  ) { 
    
    
  }
  idUser!:any
  user!: User
  //
  status:boolean=false;
  //
  profileForm: any = FormGroup;
  responseMessage: any="";
  ngOnInit(): void {
    
   //this.app.affichageHome=false;

  //  this.route.params.subscribe(params => {
  //     this.idUser = params['id'];
  //   console.log(this.idUser);
    
  //   });
console.log(this.data['id']);

    this.getUserDetails(this.data['id']);
      

   this.profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
    lastName: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
    email: ['', [Validators.required, Validators.pattern(GlobalConstants.emailRegex)], this.validateEmailUniqueness()],

  })
  }

  getUserDetails(id:any){

      this.userService.getUserDetails(id).subscribe((response)=>{
      this.user=response as User;
      this.profileForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
     });
     this.status=this.user.status=='true';
    },(error)=>{
      console.log(error)
    })
  }

 

  onSubmitUpdateProfile(){
    if(this.profileForm.valid){
      this.ngxService.start();
    const credentials:any={id:this.data['id'],...this.profileForm.value}
    this.userService.updateProfileUser(credentials).subscribe((response)=>{
      this.ngxService.stop();
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

  // Méthode de validation asynchrone pour vérifier l'unicité de l'email
  validateEmailUniqueness(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return this.validationService.validateEmail(email).pipe(
        map(response => (response ? { 'emailTaken': true } : null)),
        catchError(() => of(null)) // Utilisez 'of(null)' pour retourner une valeur nulle en cas d'erreur

      );
    };
  }

  get FirstName(): FormControl {
    return this.profileForm.get("firstName") as FormControl;
  }
  get LastName(): FormControl {
    return this.profileForm.get("lastName") as FormControl;
  }
  get Email(): FormControl {
    return this.profileForm.get("email") as FormControl;
  }
    
    
}
