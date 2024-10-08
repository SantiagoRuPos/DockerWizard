import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioInfoService} from '../../Services/usuario-info.service';
import { ServiceLoginService } from '../../Services/service-login.service'; // Importa tu servicio de actualización
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrl: './body-home.component.css'
})
export class BodyHomeComponent implements OnInit{
  usuarios: any[] = [];
  showTooltip: boolean = false; 
  constructor(
    private UsuarioInfoService: UsuarioInfoService,
    private ServiceLoginService: ServiceLoginService, // Servicio de actualización de contraseña
    private router: Router
  ) {}
  ngOnInit(): void {
    this.usuarios = this.UsuarioInfoService.getUsuarios();
    console.log(this.usuarios);
    
    if (this.usuarios.length > 0) {
      const usuario = this.usuarios[0]; // Obtener el primer usuario del array
      const necesitaRenovarContrasena = usuario.RenovacionContraseña === 1; // Cambiado a número

      if (necesitaRenovarContrasena) {
        this.mostrarModalCambioContrasena(usuario.Correo_Institucional_Usuario);
      }
    }
  }

  mostrarModalCambioContrasena(correo: string) {
    Swal.fire({
      title: 'Restablecer Contraseña',
      input: 'password',
      inputLabel: 'Ingrese su nueva contraseña',
      inputPlaceholder: 'Nueva contraseña',
      confirmButtonText: 'Actualizar',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return '¡Por favor, ingrese una contraseña!';
        }
        if (value.length < 5) {
          return 'La contraseña debe tener al menos 5 caracteres.';
        }
        return undefined; // Válido si no hay errores
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Nueva contraseña ingresada:', result.value); // Verificar el valor de la nueva contraseña
        
        // Preparar los datos para actualizar la contraseña
        const newPassword = result.value;
        const data = {
          Correo_Institucional_Usuario: correo,
          Password_Usuario: newPassword
        };
        
        // Llamar al servicio UpdatePassword
        this.ServiceLoginService.UpdatePassword(data).subscribe(
          (response) => {
            console.log('Respuesta del servidor:', response); // Verificar respuesta del servidor
            Swal.fire({
              icon: 'success',
              title: '¡Contraseña actualizada!',
              text: 'Su contraseña ha sido actualizada exitosamente.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            });
          },
          (error) => {
            console.error('Error al actualizar la contraseña:', error); // Verificar errores
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar',
              text: 'Hubo un problema al actualizar su contraseña. Inténtelo de nuevo.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Ok'
            });
          }
        );
      }
    });
  }
  RutaRapidaNuevoUsuarioCygnus(){
    this.router.navigate(['/NewUserCygnus']); 

  }
  RutaRapidaNuevoProyectoDockerWizard(){
    this.router.navigate(['/Registro-nuevo-proyecto']); 

  }
  RutaRapidaReporteFallo(){
    this.router.navigate(['/Reports']); 

  }
  RutaRapidaPerfil(){
    this.router.navigate(['/']); 

  }


  }

