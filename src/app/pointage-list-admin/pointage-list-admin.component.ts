

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

@Component({
  selector: 'app-pointage-list-admin',
  templateUrl: './pointage-list-admin.component.html',
  styleUrls: ['./pointage-list-admin.component.css'],

})
export class PointageListAdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'firstName', 'datePointage', 'heureMatin', 'heureApresMidi', 'heureRetour', 'heureDepart','update'];
  dataSource = new MatTableDataSource<any>();
  responseMessage: any="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private datePipe:DatePipe,
    public app :AppServiceService,
    private route:ActivatedRoute
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
    this.dashboardService.getAllPointageAdmin().subscribe(
      (response: any) => {
        this.dataSource.data = response.map((item:any) => ({
          ...item,
          datePointage: this.datePipe.transform(new Date(item.datePointage[0], item.datePointage[1] - 1, item.datePointage[2]), 'yyyy-MM-dd'),
          heureMatin: item.heureMatin ? this.datePipe.transform(new Date(0, 0, 0, item.heureMatin[0], item.heureMatin[1]), 'HH:mm') : '-',
          heureApresMidi: item.heureApresMidi ? this.datePipe.transform(new Date(0, 0, 0, item.heureApresMidi[0], item.heureApresMidi[1]), 'HH:mm') : '-',
          heureRetour: item.heureRetour ? this.datePipe.transform(new Date(0, 0, 0, item.heureRetour[0], item.heureRetour[1]), 'HH:mm') : '-',
          heureDepart: item.heureDepart ? this.datePipe.transform(new Date(0, 0, 0, item.heureDepart[0], item.heureDepart[1]), 'HH:mm') : '-'
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  updateRecord(id: number) {
    // Implement your update logic here using the id parameter
    console.log(`Update record with ID: ${id}`);
  }

  PointageDataByDate(date:string) {
    // this.dashboardService.getAllPointageAdmin().subscribe(
    //   (response: any) => {
    //     this.dataSource.data = response;
    //   },
    this.dashboardService.getAllPointageAdminByDate(date).subscribe(
      (response: any) => {
        this.dataSource.data = response.map((item:any) => ({
          ...item,
          datePointage: this.datePipe.transform(new Date(item.datePointage[0], item.datePointage[1] - 1, item.datePointage[2]), 'yyyy-MM-dd'),
          heureMatin: item.heureMatin ? this.datePipe.transform(new Date(0, 0, 0, item.heureMatin[0], item.heureMatin[1]), 'HH:mm') : '-',
          heureApresMidi: item.heureApresMidi ? this.datePipe.transform(new Date(0, 0, 0, item.heureApresMidi[0], item.heureApresMidi[1]), 'HH:mm') : '-',
          heureRetour: item.heureRetour ? this.datePipe.transform(new Date(0, 0, 0, item.heureRetour[0], item.heureRetour[1]), 'HH:mm') : '-',
          heureDepart: item.heureDepart ? this.datePipe.transform(new Date(0, 0, 0, item.heureDepart[0], item.heureDepart[1]), 'HH:mm') : '-'
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    



}

