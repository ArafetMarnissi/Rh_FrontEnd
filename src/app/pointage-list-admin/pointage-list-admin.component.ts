

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardService } from '../service/dashboard.service';
import { DatePipe } from '@angular/common';
import { AppServiceService } from '../service/app-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MatDialog } from '@angular/material/dialog';
import { EditAttendanceComponent } from '../edit-attendance/edit-attendance.component';
import { ChecksDetailsComponent } from '../checks-details/checks-details.component';

@Component({
  selector: 'app-pointage-list-admin',
  templateUrl: './pointage-list-admin.component.html',
  styleUrls: ['./pointage-list-admin.component.css'],

})
export class PointageListAdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'Email', 'firstName', 'datePointage', 'is_checked', 'Worked_time','update'];
  dataSource = new MatTableDataSource<any>();
  

  responseMessage: any="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private datePipe:DatePipe,
    public app :AppServiceService,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    ) {
      this.app.affichageHome=false;
      this.dataSource.filterPredicate = (data, filter) => this.customFilter(data, filter);
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
    this.dashboardService.getAllPointageAdmin().subscribe(
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

  getAttendanceById(id: number) {
    return this.dataSource.data.find(item => item.id === id);
  }

  PointageDataByDate(date:string) {
    this.dashboardService.getAllPointageAdminByDate(date).subscribe(
      (response: any) => {
        this.dataSource.data = response.map((item:any) => ({
          ...item,
          datePointage: this.datePipe.transform(new Date(item.datePointage[0], item.datePointage[1] - 1, item.datePointage[2]), 'yyyy-MM-dd')
          
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Ajoutez cette méthode pour personnaliser le filtre
customFilter(data: any, filter: string): boolean {
  return (
    (data.userWrapper.firstName + ' ' + data.userWrapper.lastName).toLowerCase().includes(filter) ||
    data.userWrapper.email.toLowerCase().includes(filter)
  );
}
  
  



}

