import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './User/login/login.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { HomeComponent } from './User/View/home/home.component';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './User/DockerWizard/register-user/register-user.component';
import { MenuComponent } from './User/DockerWizard/menu/menu.component';
import { BodyDockerWizardComponent } from './User/DockerWizard/body-docker-wizard/body-docker-wizard.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    HomeComponent,
    RegisterUserComponent,
    MenuComponent,
    BodyDockerWizardComponent,
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
