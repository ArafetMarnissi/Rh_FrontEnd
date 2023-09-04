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
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit{
  constructor(public app: AppServiceService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private dashboardService:DashboardService,
    private route: ActivatedRoute,
    private validationService:ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

  }
  EditAttendanceForm: any = FormGroup;
  responseMessage: any="";
  ngOnInit(): void {
    
   this.EditAttendanceForm = this.formBuilder.group({
    entrer: ['Check in'],
    sortie: ['Check out'],
  })
  this.getAttendanceDetails()
  }

  getAttendanceDetails(){
    
    this.EditAttendanceForm.setValue({
      entrer: this.data.entrer,
      sortie: this.data.sortie,
    });
}

 

  onSubmitUpdateAttendance(){
    if(this.EditAttendanceForm.valid){
      this.ngxService.start();
    const credentials:any={id:this.data.id,...this.EditAttendanceForm.value}
    this.dashboardService.updateAttendance(credentials).subscribe((response)=>{
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

  

    
    
}
