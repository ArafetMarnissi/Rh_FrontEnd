import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
  Date ! : String|null;

  constructor(private datePipe: DatePipe,private route:ActivatedRoute,private router:Router,private authService :AuthService) {}

  onDateChange(event: any) {
    this.selectedDate = event.value;
    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    console.log(formattedDate);
    /////
    // this.route.params.subscribe(params =>{
    //   //this.Date=this.datePipe.transform(params['date'], 'yyyy-MM-dd')
    // })
    if (this.authService.getRoles()==="ADMIN") {
      this.router.navigateByUrl('PointageAdmin?date='+ formattedDate);
    }else{
      this.router.navigateByUrl('PointageUser?date='+ formattedDate);
    }
    

  }

}
