import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router){

  }
  NuevoUsuarioDockerWizard() {
    this.router.navigate(['/registro-nuevo-usuario']);
  }
  BuscarUsuariosDockerWizard(){
    this.router.navigate(['/Buscar-Usuarios']);
  }
  StatusUsersDockerWizard(){
    this.router.navigate(['/StatusUsers']);
  }
  PrincipalDockerWizard(){
    this.router.navigate(['/AdminDockerwizard']);
  }
  RegsitroProject(){
    this.router.navigate(['/Registro-nuevo-proyecto']);

  }
  ResetPassword(){
    this.router.navigate(['/ResetPassword']);
  }
  volver(){
    this.router.navigate(['/Home']);

  }
}
