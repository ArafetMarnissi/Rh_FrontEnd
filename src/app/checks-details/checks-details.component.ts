import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../service/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../service/validation.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { EditAttendanceComponent } from '../edit-attendance/edit-attendance.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-checks-details',
  templateUrl: './checks-details.component.html',
  styleUrls: ['./checks-details.component.css']
})
export class ChecksDetailsComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'entrer', 'sortie','update'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private ngxService: NgxUiLoaderService,
    private dashboardService:DashboardService,
    public authService:AuthService,
    private datePipe:DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef ,
    public dialog: MatDialog,
  ) { 

  }

  responseMessage: any="";
  
 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.checkDetails()

    // Déclencher une détection de changement manuellement
    this.cdRef.detectChanges();
    


  }


  checkDetails() {
    const attendance: any = this.data;
    
    this.dataSource.data = attendance.checks;
    
    // Map the check times to the 'entrer' and 'sortie' format if needed
    this.dataSource.data.forEach((check: any) => {
      check.entrer = check.entrer ? this.datePipe.transform(new Date(0, 0, 0, check.entrer[0], check.entrer[1]), 'HH:mm') : '-';
      check.sortie = check.sortie ? this.datePipe.transform(new Date(0, 0, 0, check.sortie[0], check.sortie[1]), 'HH:mm') : '-';
    });
  }
  getCheckById(id: number) {
    return this.dataSource.data.find(item => item.id === id);
  }

  EditCheck(id:number){
    console.log(this.getCheckById(id));
    const dataToPass :any = this.getCheckById(id)

      const dialogRef = this.dialog.open(EditAttendanceComponent, {
        width: '750px',
        disableClose: false,
        data: dataToPass
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAttendanceChecksDetails(this.data.id); // Appelez votre méthode pour rafraîchir les données
      }
  });
  }

  getAttendanceChecksDetails(id: number) {
    this.dashboardService.getAttendanceChecksById(id).subscribe(
      (response: any) => {
        this.dataSource.data = response.map((check: any) => ({
          ...check,
          entrer: check.entrer ? this.datePipe.transform(new Date(0, 0, 0, check.entrer[0], check.entrer[1]), 'HH:mm') : '-',
          sortie: check.sortie ? this.datePipe.transform(new Date(0, 0, 0, check.sortie[0], check.sortie[1]), 'HH:mm') : '-',
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  

}
