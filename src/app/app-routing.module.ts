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
import UserListComponent from './user-list/user-list.component';
import { PointageListAdminComponent } from './pointage-list-admin/pointage-list-admin.component';
import { PointageListUserComponent } from './pointage-list-user/pointage-list-user.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PersonalProfilComponent } from './personal-profil/personal-profil.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';


const routes: Routes = [
 {path :'login' , component:LoginComponent },
 {path :'register' , component:RegisterComponent },
 {path :'button' , component:UiButtonsComponent ,canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR','ADMIN']}},
 {path :'userList' , component:UserListComponent ,canActivate:[RouteGuardService],data:{roles:['ADMIN']}},
 {path :'PointageAdmin' , component:PointageListAdminComponent ,canActivate:[RouteGuardService],data:{roles:['ADMIN']}},
 {path :'sample_page' , component:SamplePageComponent },
 {path :'profile' , component:ProfileComponent , canActivate:[RouteGuardService],data:{roles:['ADMIN']}},
 {path :'personalProfil' , component:PersonalProfilComponent, canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR','ADMIN']} },
 {path :'alerts' , component:UiAlertsComponent },
 {path :'cards' , component:UiCardComponent },
//  {path:'dashboard', component:DashboardComponent, canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR','ADMIN']}},
 {path:'forgotPassword', component:ForgotPasswordComponent},
 {path:'PointageAdmin?date=', component:PointageListAdminComponent ,canActivate:[RouteGuardService],data:{roles:['ADMIN']}},
 {path :'PointageUser' , component:PointageListUserComponent ,canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR']}},
 {path:'PointageUser?date=', component:PointageListUserComponent ,canActivate:[RouteGuardService],data:{roles:['COLLABORATEUR']}},
 {path: 'createnewPassword', component: CreateNewPasswordComponent },
 { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
