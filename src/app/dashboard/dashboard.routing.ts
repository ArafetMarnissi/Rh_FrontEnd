import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UiAlertsComponent } from '../ui-alerts/ui-alerts.component';
import { UiCardComponent } from '../ui-card/ui-card.component';
import { NgModule } from '@angular/core';

const routes: Routes =[
    
    {path :'dashboard' , component:DashboardComponent },
    {path :'cards' , component:UiCardComponent },
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModele { }