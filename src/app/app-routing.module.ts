import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './Services/auth.guard';



//rutas
import { LoginComponent } from './User/login/login.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { HomeComponent } from './User/home/home.component';
import {MenuComponent} from './User/DockerWizard/menu/menu.component';
import {BodyDockerWizardComponent} from './User/DockerWizard/body-docker-wizard/body-docker-wizard.component';
import { RegisterUserComponent } from "./User/DockerWizard/register-user/register-user.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'RestablecerContrasena', component: ResetPasswordComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'AdminDockerwizard', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'registro-nuevo-usuario', component: RegisterUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
