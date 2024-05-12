import { Component } from '@angular/core';
import { ServiceLoginService } from '../../../Services/service-login.service';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-status-user',
  templateUrl: './status-user.component.html',
  styleUrl: './status-user.component.css'
})
export class StatusUserComponent {
  users: any[] = [];
  Nombre_Usuario: string = '';
  estadoSeleccionado: string = 'Nuevo estado para el usuario'; // Agregar una variable para guardar el estado seleccionado
  usuarioActual: any = {};
  // Nombre de usuario seleccionado

  constructor(private ServiceLoginService: ServiceLoginService) {

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
          }
        )
      }

    );
  }
  getEstadoUsuario(estado: number): string {
    return estado === 1 ? 'Activo' : 'Desactivado';
  }


  seleccionarUsuario(nombreUsuario: string) {
    this.Nombre_Usuario = nombreUsuario; // Actualiza Nombre_Usuario con el nombre seleccionado
  }
  cambiarEstado() {
    if (this.Nombre_Usuario === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Ingrese un usuario',
        text: 'Por favor, ingrese un usaurio',
        confirmButtonText: 'OK'
      });
    } else {
      if (this.estadoSeleccionado === 'Nuevo estado para el usuario') {
        Swal.fire({
          icon: 'warning',
          title: 'Seleccione un estado',
          text: 'Por favor, seleccione un estado válido',
          confirmButtonText: 'OK'
        });
        return;
      }else if (this.estadoSeleccionado === '2') {
        Swal.fire({
          icon: 'warning',
          title: '¿Está seguro de desactivar el proyecto?',
          text: 'Esta acción desactivará el proyecto. ¿Está seguro?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, desactivar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            const estadoNumero = parseInt(this.estadoSeleccionado);
              this.ServiceLoginService.UpdateStatusUser(estadoNumero, this.Nombre_Usuario).subscribe(
                response => {
                  console.log('Usuario actualizado exitosamente:', response);
                    Swal.fire({
                      icon: 'warning',
                      title: 'El usuario se desactivo',
                      text: 'El usuario ya no podra ingresar al sistema hasta que se habilite nuevamnete.',
                      confirmButtonText: 'OK'
                    });
                    this.TraerUsuario();
                   }
                  )
          }
        });
      }
      else  {
        const estadoNumero = parseInt(this.estadoSeleccionado);
        this.ServiceLoginService.UpdateStatusUser(estadoNumero, this.Nombre_Usuario).subscribe(
          response => {
            console.log('Usuario actualizado exitosamente:', response);
              Swal.fire({
                icon: 'warning',
                title: 'El usuario se Activo',
                text: 'El usuario Ya se encuentra activado correctamente',
                confirmButtonText: 'OK'
              });
              this.TraerUsuario();
             }
            )
      }
    }
  }
  guardarUsuarioActual(usuario: any) {
    this.usuarioActual = usuario;
  }

}