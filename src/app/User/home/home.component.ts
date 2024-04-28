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
  logout(): void {
    this.authService.logout(); // Llama al método de logout del servicio de autenticación
  }
}
