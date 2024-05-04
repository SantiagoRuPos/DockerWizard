import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-docker-wizard',
  templateUrl: './body-docker-wizard.component.html',
  styleUrl: './body-docker-wizard.component.css'
})
export class BodyDockerWizardComponent {
constructor(private router:Router){

}
RegistroUsuario(){
  this.router.navigate(['/registro-nuevo-usuario']); 
}
ActivarUsuario(){
  this.router.navigate(['/StatusUsers']); 
}
ResetPassword(){
  this.router.navigate(['/ResetPassword']); 
}
RegistroProyecto(){
  this.router.navigate(['/Registro-nuevo-proyecto']); 
}
}
