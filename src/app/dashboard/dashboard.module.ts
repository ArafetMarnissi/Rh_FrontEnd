import { NgModule } from "@angular/core";
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from "ngx-ui-loader";
import { AppComponent } from "../app.component";
import { AuthContentComponent } from "../auth-content/auth-content.component";
import { HeaderComponent } from "../header/header.component";
import { WelcomeContentComponent } from "../welcome-content/welcome-content.component";
import { ContentComponent } from "../content/content.component";
import { ButtonsComponent } from "../buttons/buttons.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { UiButtonsComponent } from "../ui-buttons/ui-buttons.component";
import { UiAlertsComponent } from "../ui-alerts/ui-alerts.component";
import { UiCardComponent } from "../ui-card/ui-card.component";
import { UiFormsComponent } from "../ui-forms/ui-forms.component";
import { UiTypographyComponent } from "../ui-typography/ui-typography.component";
import { SamplePageComponent } from "../sample-page/sample-page.component";
import { SidebarNavComponent } from "../sidebar-nav/sidebar-nav.component";
import { HomeComponent } from "../home/home.component";
import { DashboardComponent } from "./dashboard.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";



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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class DashbordModule { }
