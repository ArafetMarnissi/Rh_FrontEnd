import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { UiButtonsComponent } from './ui-buttons/ui-buttons.component';
import { UiAlertsComponent } from './ui-alerts/ui-alerts.component';
import { UiCardComponent } from './ui-card/ui-card.component';
import { UiFormsComponent } from './ui-forms/ui-forms.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
 {path :'login' , component:LoginComponent },
 {path :'register' , component:RegisterComponent },
 {path :'button' , component:UiButtonsComponent ,canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR','ADMIN']}},
 {path :'sample_page' , component:SamplePageComponent },
 {path :'alerts' , component:UiAlertsComponent },
 {path :'cards' , component:UiCardComponent },
 {path:'forms', component:UiFormsComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR','ADMIN']}},
 {path:'forgotPassword', component:ForgotPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
