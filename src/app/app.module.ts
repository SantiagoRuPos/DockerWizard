import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './User/login/login.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';



import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './User/DockerWizard/register-user/register-user.component';
import { MenuComponent } from './User/DockerWizard/menu/menu.component';
import { BodyDockerWizardComponent } from './User/DockerWizard/body-docker-wizard/body-docker-wizard.component';
import { ListUsersComponent } from './User/DockerWizard/list-users/list-users.component';


import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { StatusUserComponent } from './User/DockerWizard/status-user/status-user.component';
import { BodyHomeComponent } from './User/body-home/body-home.component';
import { HomeComponent  } from "./User/home/home.component";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import { MenuAutoDokcerComponent } from './User/AutoDocker/menu-auto-dokcer/menu-auto-dokcer.component';
import { NewProjectComponent } from './User/DockerWizard/new-project/new-project.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegisterUserComponent,
    MenuComponent,
    BodyDockerWizardComponent,
    ListUsersComponent,
    StatusUserComponent,
    BodyHomeComponent,
    HomeComponent,
    MenuAutoDokcerComponent,
    NewProjectComponent
 
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
