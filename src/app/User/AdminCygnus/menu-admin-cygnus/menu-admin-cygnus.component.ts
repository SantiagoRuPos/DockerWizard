import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin-cygnus',
  templateUrl: './menu-admin-cygnus.component.html',
  styleUrl: './menu-admin-cygnus.component.css'
})
export class MenuAdminCygnusComponent {
  constructor(private router:Router){

  }
  NewUserCygnus(){
    this.router.navigate(['/NewUserCygnus']); 
  }
  ListUserCygnus(){
    this.router.navigate(['/ListUserCygnus']); 

  }
  Atras(){
    this.router.navigate(['/AdminCygnus']); 
  }
  MenuPrincipal(){
    this.router.navigate(['/Home']); 
  }
}
