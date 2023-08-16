import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';


@Component({
  selector: 'app-ui-forms',
  templateUrl: './ui-forms.component.html',
  styleUrls: ['./ui-forms.component.css']
})
export class UiFormsComponent implements OnInit{
  constructor(public app : AppServiceService){}
  ngOnInit(): void {
   this.app.affichageHome=false;
  }

}
