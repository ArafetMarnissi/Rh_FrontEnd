import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { RegisterComponent } from './register/register.component';
import { UiButtonsComponent } from './ui-buttons/ui-buttons.component';
import { UiAlertsComponent } from './ui-alerts/ui-alerts.component';
import { UiCardComponent } from './ui-card/ui-card.component';
import { UiFormsComponent } from './ui-forms/ui-forms.component';
import { UiTypographyComponent } from './ui-typography/ui-typography.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ValidationService } from './service/validation.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppServiceService } from './service/app-service.service';
import { LoginComponent } from './login/login.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TokenInterceptorInterceptor } from './service/token-interceptor.interceptor';
import { RouteGuardService } from './service/route-guard.service';
import { AuthService } from './service/auth.service';
import { DashboardService } from './service/dashboard.service';
import { AxiosService } from './axios.service';
import { UserService } from './service/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './shared/material-module';
import { NotFoundComponent } from './not-found/not-found.component';
import UserListComponent from './user-list/user-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SharedModule } from './shared/shared.module';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { PointageListAdminComponent } from './pointage-list-admin/pointage-list-admin.component';
import { PointageListUserComponent } from './pointage-list-user/pointage-list-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './profile/profile.component';
import { PersonalProfilComponent } from './personal-profil/personal-profil.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';


const ngxUiLoaderConfig:NgxUiLoaderConfig={
  text:"loading ...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  bgsColor:"#0d6efd",
  fgsColor:"#0d6efd",
  fgsType:SPINNER.squareJellyBox,
  fgsSize:100,
  hasProgressBar:false
  

}

@NgModule({
  declarations: [
    AppComponent,
    AuthContentComponent,
    HeaderComponent,
    WelcomeContentComponent,
    ButtonsComponent,
    LoginComponent,
    RegisterComponent,
    UiButtonsComponent,
    UiAlertsComponent,
    UiCardComponent,
    UiFormsComponent,
    UiTypographyComponent,
    SamplePageComponent,
    SidebarNavComponent,
    HomeComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    UserListComponent,
    PointageListUserComponent,
    PointageListAdminComponent,
    ProfileComponent,
    PersonalProfilComponent,
    ChangePasswordComponent,
    CreateNewPasswordComponent,
    
    
    

    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MaterialModule,
    SharedModule,
    DatePickerComponent,
    
    
    MatPseudoCheckboxModule,
    MatTableModule, MatPaginatorModule,DatePickerComponent


  ],
  providers: [
    AppServiceService,
    ValidationService,
    HttpClientModule,
    RouteGuardService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorInterceptor,
      multi:true
    },
    AuthService,
    DashboardService,
    AxiosService,
    UserService,
    MatDialog,
    DatePipe,
    NotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
