
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
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-personal-profil',
  templateUrl: './personal-profil.component.html',
  styleUrls: ['./personal-profil.component.css']
})
export class PersonalProfilComponent implements OnInit{
  constructor(public app: AppServiceService,
    private axiosService: AxiosService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private validationService:ValidationService,
    public authService :AuthService
   
    

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
    
   this.app.affichageHome=false;

  //  this.route.params.subscribe(params => {
  //     this.idUser = params['id'];
  //   console.log(this.idUser);
    
  //   });


    this.getUserDetails();
      

   this.profileForm = this.formBuilder.group({
    firstName: [{ value: '', disabled: this.authService.roleMatch(['COLLABORATEUR']) },[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
    lastName: [{ value: '', disabled: this.authService.roleMatch(['COLLABORATEUR']) }, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
    email: [{ value: '', disabled: this.authService.roleMatch(['COLLABORATEUR']) }, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)], this.validateEmailUniqueness()],

  })
  }

  getUserDetails(){

      this.userService.getCurrentUser().subscribe((response)=>{
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
    const credentials:any={id:this.idUser,...this.profileForm.value}
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
