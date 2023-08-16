import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, FormControl, AsyncValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { Observable, catchError, map, of } from 'rxjs';
import { ValidationService } from '../service/validation.service';
import { AppServiceService } from '../service/app-service.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { GlobalConstants } from '../shared/global-constants';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password = true;
  confirmpassword = true;
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(public app: AppServiceService,
    private axiosService: AxiosService,
    private validationService: ValidationService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private snackBarSer: SnackbarService,
    private userService: UserService

  ) { }

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
  ngOnInit(): void {
    this.app.affichage = false;

    this.signupForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      lastName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)], this.validateEmailUniqueness()],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]]
    })

  }


  passwordMatchValidator() {


    if (this.signupForm.get('password').value != this.signupForm.get('confirmPassword').value) {
      return true;
    } else {
      return false;
    }
  }
//   onSubmit():void{
//     if (this.signupForm.valid) {
//   this.ngxService.start();
//     this.userService.register(this.signupForm.value
//     ).subscribe((response :any )=>{
//       alert(response);
//       this.ngxService.stop();
//       this.router.navigate(['/login']);

//     },(error)=>{
//       this.ngxService.stop();
//       //this.snackBarSer.openSnackBar(this.responseMessage, GlobalConstants.error);
//       console.log(
//         error
//         );
//     }
//     );
//   }
// }

  onSubmit() {
    if (this.signupForm.valid) {


      this.ngxService.start();
      const credentials = this.signupForm.value;

      this.axiosService.request(
        "POST",
        "/api/auth/register", credentials, false
      ).then(response => {
        alert(response);
        this.ngxService.stop();
        this.router.navigate(['login']);

      }, (error) => {
        this.ngxService.stop();
        console.log(error);

      });
    }else{
      console.log("erreur de connection");
    }
  }


  get FirstName(): FormControl {
    return this.signupForm.get("firstName") as FormControl;
  }
  get LastName(): FormControl {
    return this.signupForm.get("lastName") as FormControl;
  }
  get Email(): FormControl {
    return this.signupForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.signupForm.get("password") as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.signupForm.get("confirmPassword") as FormControl;
  }




}

