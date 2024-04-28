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
  navegarAComponente() {
    this.router.navigate(['/registro-nuevo-usuario']);
  }
  BuscarUsuarios(){
    this.router.navigate(['/Buscar-Usuarios']);
  }
  StatusUsers(){
    this.router.navigate(['/StatusUsers']);
  }
  Principal(){
    this.router.navigate(['/AdminDockerwizard']);

  }
  volver(){
    this.router.navigate(['/Home']);

  }
}
