import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';



import {ServiceLoginService} from '../../Services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  imagenes: string = '';
 
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  constructor (private ServiceLoginService:ServiceLoginService, private router: Router,private formBuilder: FormBuilder,){

    this.loginForm = this.formBuilder.group({
      Nombre_Usuario: ['', Validators.required],
      Password_Usuario: ['', Validators.required]
    });
  }

  login() {
    // Obtén los valores del formulario
    const credentials = this.loginForm.value;
    this.ServiceLoginService.login(credentials).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Las credenciales son incorrectas. Por favor, inténtalo de nuevo.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
  
        console.error('Usuario o contraseña incorrectos.');
     
      }
    });
  }
}
  
  


/*  listarImagenesDocker() {
    this.ServiceLoginService.listarImagenesDocker().subscribe(
      (data: any) => {
        this.imagenes = data.images;
      },
      (error: any) => {
        console.error('Error al obtener las imágenes de Docker:', error);
      }
    );
  }*/

