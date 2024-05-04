import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {ServiceLoginService} from '../../Services/service-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: ServiceLoginService,private router: Router) { }
  navegarAComponente() {
    this.router.navigate(['/AdminDockerwizard']); 
  }
  AutoDocker(){
    this.router.navigate(['/AutoDocker']); 
  }
  logout(): void {
  
    this.authService.logout(); // Llama al método de logout del servicio de autenticación
    this.login();
  }
  login(){
    this.router.navigate(['/login']); 
  }
  AdminCygnus(){
    this.router.navigate(['/AdminCygnus']); 
  }
}
