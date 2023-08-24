// import { Component } from '@angular/core';
// import { DashboardService } from '../service/dashboard.service';
// import { User } from '../shared/model/user';
// import { AppServiceService } from '../service/app-service.service';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css'],
// })
// export class UserListComponent {
//   userList : User[]= [];
  
//   constructor(private dashboardService:DashboardService,
//     public app:AppServiceService
//     ){
//       app.affichageHome=false;
//       this.dashbordData();
      

//     }


//   dashbordData() {
//     this.dashboardService.getAllUser().subscribe((response:any)=>{
//       this.userList = response;
      
//     },(error:any)=>{
//       console.log(error);
//     });
//   }


// }



import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardService } from '../service/dashboard.service';
import { DatePipe } from '@angular/common';
import { AppServiceService } from '../service/app-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../axios.service';
import { User } from '../shared/model/user';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export default class UserListComponent implements OnInit {
  userList : User[]= [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'status','action'];

  dataSource = new MatTableDataSource<any>();
  ////
  responseMessage: any="";
///
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private datePipe:DatePipe,
    public app :AppServiceService,
    private route:ActivatedRoute,
    private axiosService:AxiosService,
    private router:Router,
    public dialog: MatDialog,
    private ngxservice:NgxUiLoaderService
    ) {
      this.app.affichageHome=false;
      //this.dashbordData();
    }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.ListUser();


    this.route.params.subscribe(params=>{
      if(params['id']){
        this.modifierUser(params['id'])
        console.log("ok");
      }
    })
  }

      ListUser() {
    this.dashboardService.getAllUser().subscribe(
      (response: any) => {
        this.userList = response;
        this.dataSource.data=response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  updateStatus(id:any){
    this.ngxservice.start()
    this.dashboardService.updateStatus(id).subscribe(
      (response)=>{
        this.ngxservice.stop()
        this.ListUser();
        this.responseMessage=response
        this.responseMessage=this.responseMessage.message
        console.log(response);
    },(error)=>{
      this.ngxservice.stop()
      this.ListUser();
      this.responseMessage=error
      this.responseMessage=this.responseMessage.message
      console.log("error="+error);
      
    })
  }
  // updateStatus(id:any){
  //   this.ngxservice.start()
  //   const credentials={id: id}
  //   this.axiosService.request(
  //     "POST",
  //     "/api/user/update", credentials, true
  //   ).then(response => {
  //     this.ngxservice.stop()
  //     console.log(response.data.message);
  //     this.ListUser();
  //     this.responseMessage=response.data.message
  //   }, (error) => {
  //     this.ngxservice.stop()
  //     this.responseMessage="error"
  //     console.log(error);

  //   });
  // }
  modifierUser(id:any){
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '750px',
      disableClose: false,
      data: { id: id }
  });

  dialogRef.afterClosed().subscribe(result => {
      // Ici, vous pouvez déclencher une action, par exemple, rafraîchir l'affichage
      if (result === 'refresh') {
        this.ListUser(); // Appelez votre méthode pour rafraîchir les données
      }
  });
}
applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  
}

