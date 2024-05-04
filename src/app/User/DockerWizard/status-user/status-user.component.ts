import { Component } from '@angular/core';
import {ServiceLoginService} from '../../../Services/service-login.service';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-status-user',
  templateUrl: './status-user.component.html',
  styleUrl: './status-user.component.css'
})
export class StatusUserComponent {
  users: any[] = [];
  Nombre_Usuario: string ='';
  estadoSeleccionado: string = 'Nuevo estado para el usuario'; // Agregar una variable para guardar el estado seleccionado
  usuarioActual: any = {};
// Nombre de usuario seleccionado
 
  constructor(private ServiceLoginService:ServiceLoginService){

  }
  TraerUsuario() {
    this.ServiceLoginService.getUsersByName(this.Nombre_Usuario).subscribe(
        (data: any) => {
          
            if (Array.isArray(data.usuarios)) {
                this.users = data.usuarios;
                
            } else {
                this.users = data.usuarios ? [data.usuarios] : [];
            }

            if (this.users.length === 0) {
                // Mostrar alerta cuando no se encuentra el usuario
                console.log("error");
              
            }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'El usuario que busca no existe',
            confirmButtonText: 'OK'
        });
            console.log(error);
            this.ServiceLoginService.getAllUser().subscribe(
              (data:any)=> {
                 
            if (Array.isArray(data.usuarios)) {
              this.users = data.usuarios;
              
          } else {
              this.users = data.usuarios ? [data.usuarios] : [];
          }

          if (this.users.length === 0) {
              // Mostrar alerta cuando no se encuentra el usuario
              console.log("error");
            
          }
              }
            )
          }
      
    );
}
getEstadoUsuario(estado: number): string {
  return estado === 1 ? 'Activo' : 'Desactivado';
}


// Resto de tu código...

// Función para capturar el nombre de usuario seleccionado
seleccionarUsuario(nombreUsuario: string) {
  this.Nombre_Usuario = nombreUsuario; // Actualiza Nombre_Usuario con el nombre seleccionado
}
cambiarEstado() {
  if (this.estadoSeleccionado === 'Nuevo estado para el usuario') {
    Swal.fire({
      icon: 'warning',
      title: 'Seleccione un estado',
      text: 'Por favor, seleccione un estado válido',
      confirmButtonText: 'OK'
    });
    return;
  } 

    const estadoNumero = parseInt(this.estadoSeleccionado);

    // Verifica si el resultado de parseInt es un número
    if (!isNaN(estadoNumero)) {
      // Si es un número, llama al servicio
      this.ServiceLoginService.UpdateStatusUser(estadoNumero,this.Nombre_Usuario).subscribe(
        response =>{
          console.log('Usuario actualizado exitosamente:', response);
          if (estadoNumero === 2 ) {
            Swal.fire({
              icon: 'warning',
              title: 'El usuario se desactivo',
              text: 'El usuario ya no podra ingresar al sistema hasta que se habilite nuevamnete.',
              confirmButtonText: 'OK'
            });
        
          } 
          else {
            Swal.fire({
              icon: 'info',
              title: 'Activacion exitosa!',
              text: 'El usuario se encuentra activado',
              confirmButtonText: 'OK'
            });
          }
          
        }
      );
      console.log(this.Nombre_Usuario,estadoNumero);
    } else {
      // Si no es un número, muestra un error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al seleccionar el estado',
        confirmButtonText: 'OK'
      });
      return;
    }
  

}
guardarUsuarioActual(usuario: any) {
  this.usuarioActual = usuario;
}

}