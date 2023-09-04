

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardService } from '../service/dashboard.service';
import { DatePipe } from '@angular/common';
import { AppServiceService } from '../service/app-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../axios.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { ChecksDetailsComponent } from '../checks-details/checks-details.component';

@Component({
  selector: 'app-pointage-list-user',
  templateUrl: './pointage-list-user.component.html',
  styleUrls: ['./pointage-list-user.component.css'],
})
export class PointageListUserComponent implements AfterViewInit {
  displayedColumns: string[] = ['datePointage', 'is_checked', 'workTime','Action'];
  dataSource = new MatTableDataSource<any>();
  responseMessage: any="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private datePipe:DatePipe,
    public app :AppServiceService,
    private route:ActivatedRoute,
    private axiosService:AxiosService,
    private ngxService:NgxUiLoaderService,
    public dialog: MatDialog,
    ) {
      this.app.affichageHome=false;
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.PointageData();
//affichage par date:
    this.route.queryParams.subscribe(params=>{
      if(params['date']){
        this.PointageDataByDate(params['date'])
        console.log("ok");
      }
    })

  }

  PointageData() {
    this.dashboardService.getAllPointageUser().subscribe(
      (response: any) => {
        
        this.dataSource.data = response.map((item:any) => ({
          ...item,
          datePointage: this.datePipe.transform(new Date(item.datePointage[0], item.datePointage[1] - 1, item.datePointage[2]), 'EEEE-MMMM-y')
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  PointageDataByDate(date:string) {
    this.dashboardService.getAllPointageUserByDate(date).subscribe(
      (response: any) => {
        this.dataSource.data = response.map((item:any) => ({
          ...item,
          datePointage: this.datePipe.transform(new Date(item.datePointage[0], item.datePointage[1] - 1, item.datePointage[2]), 'EEEE-MMMM-y')
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );



  }

  onSubmitPointer() {
    this.ngxService.start()
    this.dashboardService.setPointage().subscribe(
      (response: any) => {
        this.ngxService.stop()
        console.log(response.message);
        this.PointageData();
        this.responseMessage=response.message
         // Affiche le message de la réponse JSON
      },
      (error) => {
        this.ngxService.stop()
        console.log(error);
        this.PointageData();
        this.responseMessage=error
      }
    );
    
  }

  getAttendanceById(id: number) {
    return this.dataSource.data.find(item => item.id === id);
  }

  viewDetailsChecks(id :number){
    const dataToPass :any = this.getAttendanceById(id)
      const dialogRef = this.dialog.open(ChecksDetailsComponent, {
        width: '750px',
        disableClose: false,
        data: dataToPass
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.PointageData(); // Appelez votre méthode pour rafraîchir les données
      }
  });

  }

}

