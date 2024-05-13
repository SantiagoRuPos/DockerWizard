import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './Services/auth.guard';



//rutas funciones usuarios
import { LoginComponent } from './User/login/login.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { HomeComponent } from './User/home/home.component';
import {MenuComponent} from './User/DockerWizard/menu/menu.component';
import {BodyDockerWizardComponent} from './User/DockerWizard/body-docker-wizard/body-docker-wizard.component';
import { RegisterUserComponent } from "./User/DockerWizard/register-user/register-user.component";
import { ListUsersComponent } from './User/DockerWizard/list-users/list-users.component';
import { BodyHomeComponent } from "./User/body-home/body-home.component";
import {StatusUserComponent} from './User/DockerWizard/status-user/status-user.component';
import { NewProjectComponent } from './User/DockerWizard/new-project/new-project.component';


//Rutas Docker
import {BodyAutoDockerComponent} from './User/AutoDocker/body-auto-docker/body-auto-docker.component';


//RUATAS
import {BodyAdminCygnusComponent} from './User/AdminCygnus/body-admin-cygnus/body-admin-cygnus.component';
import { ResetPasswordUserComponent } from './User/DockerWizard/reset-password-user/reset-password-user.component';
import { ListProjectsComponent } from './User/DockerWizard/list-projects/list-projects.component';
import { StatusProjectComponent } from './User/DockerWizard/status-project/status-project.component';
import { NewUserCygnusComponent } from './User/AdminCygnus/new-user-cygnus/new-user-cygnus.component';
import { ListUsersCygnusComponent } from './User/AdminCygnus/list-users-cygnus/list-users-cygnus.component';
import { ProcessCygnusComponent } from './User/AdminCygnus/process-cygnus/process-cygnus.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Home', component:BodyHomeComponent , canActivate: [AuthGuard] },

  ///RUTAS DE GESTION DE DOCKERWIZARD
  { path: 'AdminDockerwizard', component: BodyDockerWizardComponent, canActivate: [AuthGuard] },
  { path: 'registro-nuevo-usuario', component: RegisterUserComponent, canActivate: [AuthGuard] },
  { path: 'Buscar-Usuarios', component:ListUsersComponent, canActivate: [AuthGuard]},
  { path: 'StatusUsers', component:StatusUserComponent, canActivate: [AuthGuard]},
  { path: 'Registro-nuevo-proyecto', component:NewProjectComponent,canActivate:[AuthGuard]},
  { path: 'ResetPassword', component: ResetPasswordUserComponent,canActivate:[AuthGuard] },
  { path: 'ListProjects',component:ListProjectsComponent,canActivate:[AuthGuard]},
  { path: 'StatusProject',component:StatusProjectComponent,canActivate:[AuthGuard]},


  //Rutas para AUTOMATIZACION DE LOS DOCKERS DEL SERVIDOR
  {path: 'AutoDocker', component:BodyAutoDockerComponent,canActivate:[AuthGuard]},
  
  //Rutas para Admnistracion
  {path: 'AdminCygnus', component:BodyAdminCygnusComponent,canActivate:[AuthGuard]},
  {path: 'NewUserCygnus', component:NewUserCygnusComponent,canActivate:[AuthGuard]},
  {path: 'ListUserCygnus',component:ListUsersCygnusComponent,canActivate:[AuthGuard]},
  {path: 'ProcessCygnus', component:ProcessCygnusComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
