import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';


@Component({
  selector: 'app-ui-buttons',
  templateUrl: './ui-buttons.component.html',
  styleUrls: ['./ui-buttons.component.css']
})
export class UiButtonsComponent implements OnInit {
  constructor(public app:AppServiceService){}
  ngOnInit(): void {
  this.app.affichageHome=false;
  }

}
