import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';


@Component({
  selector: 'app-ui-alerts',
  templateUrl: './ui-alerts.component.html',
  styleUrls: ['./ui-alerts.component.css']
})
export class UiAlertsComponent implements OnInit{
  constructor(public app:AppServiceService){}
  ngOnInit(): void {
 this.app.affichageHome=false
  }

}
