import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';


@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css']
})
export class UiCardComponent implements OnInit{
  constructor(public app:AppServiceService){}
  ngOnInit(): void {
 this.app.affichageHome=false
  }

}
