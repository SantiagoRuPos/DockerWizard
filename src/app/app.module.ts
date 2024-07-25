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

import { NewProjectComponent } from './User/DockerWizard/new-project/new-project.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

import { MatTooltipModule } from '@angular/material/tooltip';
import { BodyAutoDockerComponent } from './User/AutoDocker/body-auto-docker/body-auto-docker.component';
import { MenuAutoDockerComponent } from './User/AutoDocker/menu-auto-docker/menu-auto-docker.component';
import { BodyAdminCygnusComponent } from './User/AdminCygnus/body-admin-cygnus/body-admin-cygnus.component';
import { MenuAdminCygnusComponent } from './User/AdminCygnus/menu-admin-cygnus/menu-admin-cygnus.component';
import { ListProjectsComponent } from './User/DockerWizard/list-projects/list-projects.component';
import { ResetPasswordUserComponent } from './User/DockerWizard/reset-password-user/reset-password-user.component';
import { StatusProjectComponent } from './User/DockerWizard/status-project/status-project.component';
import { NewUserCygnusComponent } from './User/AdminCygnus/new-user-cygnus/new-user-cygnus.component';
import { ListUsersCygnusComponent } from './User/AdminCygnus/list-users-cygnus/list-users-cygnus.component';
import { ProcessCygnusComponent } from './User/AdminCygnus/process-cygnus/process-cygnus.component';
import { ResetPasswordCygnusComponent } from './User/AdminCygnus/reset-password-cygnus/reset-password-cygnus.component';
import { MonitorUserCygnusComponent } from './User/AdminCygnus/monitor-user-cygnus/monitor-user-cygnus.component';
import { PermissionsUserCygnusComponent } from './User/AdminCygnus/permissions-user-cygnus/permissions-user-cygnus.component';

import { StatusDockerServicesComponent } from './User/AutoDocker/status-docker-services/status-docker-services.component';
import { BackUpComponent } from './User/AutoDocker/back-up/back-up.component';
import { DockerUpComponent } from './User/AutoDocker/docker-up/docker-up.component';
import { DockerLogsComponent } from './User/AutoDocker/docker-logs/docker-logs.component';
import { MonitoringImagesComponent } from './User/AutoDocker/monitoring-images/monitoring-images.component';
import { NewRutaComponent } from './User/AutoDocker/new-ruta/new-ruta.component';


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
    NewProjectComponent,
    BodyAutoDockerComponent,
    MenuAutoDockerComponent,
    BodyAdminCygnusComponent,
    MenuAdminCygnusComponent,
    ListProjectsComponent,
    ResetPasswordUserComponent,
    StatusProjectComponent,
    NewUserCygnusComponent,
    ListUsersCygnusComponent,
    ProcessCygnusComponent,
    ResetPasswordCygnusComponent,
    MonitorUserCygnusComponent,
    PermissionsUserCygnusComponent,
    StatusDockerServicesComponent,
    BackUpComponent,
    DockerUpComponent,
    DockerLogsComponent,
    MonitoringImagesComponent,
    NewRutaComponent
    
 
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTooltipModule 

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
