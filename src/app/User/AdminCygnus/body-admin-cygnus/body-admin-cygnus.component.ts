import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-admin-cygnus',
  templateUrl: './body-admin-cygnus.component.html',
  styleUrl: './body-admin-cygnus.component.css'
})
export class BodyAdminCygnusComponent {
  constructor(private router:Router){

  }
  NewUserCygnus(){
    this.router.navigate(['/NewUserCygnus']); 
  }
  ListUserCygnus(){
    this.router.navigate(['/ListUserCygnus']); 
  }
  MonitorUserCygnus(){
    this.router.navigate(['/MonitorUserCygnus']);
  }
}
