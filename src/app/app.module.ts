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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TokenInterceptorInterceptor } from './service/token-interceptor.interceptor';
import { RouteGuardService } from './service/route-guard.service';
import { AuthService } from './service/auth.service';
import { DashboardService } from './service/dashboard.service';
import { AxiosService } from './axios.service';
import { UserService } from './service/user.service';


const ngxUiLoaderConfig:NgxUiLoaderConfig={
  text:"loading ...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  bgsColor:"#7b1fa2",
  fgsColor:"#7b1fa2",
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
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    AppServiceService,
    MatSnackBar,
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
