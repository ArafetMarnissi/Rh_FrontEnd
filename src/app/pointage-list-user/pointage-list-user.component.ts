

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

@Component({
  selector: 'app-pointage-list-user',
  templateUrl: './pointage-list-user.component.html',
  styleUrls: ['./pointage-list-user.component.css'],
})
export class PointageListUserComponent implements AfterViewInit {
  displayedColumns: string[] = ['datePointage', 'heureMatin', 'heureApresMidi', 'heureRetour', 'heureDepart'];
  dataSource = new MatTableDataSource<any>();
  responseMessage: any="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private datePipe:DatePipe,
    public app :AppServiceService,
    private route:ActivatedRoute,
    private axiosService:AxiosService,
    private ngxService:NgxUiLoaderService
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


  PointageDataByDate(date:string) {
    this.dashboardService.getAllPointageUserByDate(date).subscribe(
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
  // onSubmitPointer(): void {
  //   this.axiosService.request(
  //     "GET",
  //     "/api/pointage/pointer", "", true
  //   ).then(response => {
  //     alert ("Pointage ajouté avec succés")
      
  //     alert(response.data);
  //   }, (error) => {
  //     console.log(error);

  //   });
  // }

}

