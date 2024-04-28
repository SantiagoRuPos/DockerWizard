import { Component } from '@angular/core';
import { ServiceLoginService } from '../../../Services/service-login.service';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',

})
export class ListUsersComponent {
  users: any[] = [];
  Nombre_Usuario: string = '';

  constructor(private ServiceLoginService: ServiceLoginService, private router: Router) {

  }

  loadUsers() {
    if (this.Nombre_Usuario && this.Nombre_Usuario.trim() !== '') {
      // Si se proporciona un nombre de usuario, buscar usuarios por ese nombre
      this.ServiceLoginService.getUsersByName(this.Nombre_Usuario).subscribe(
        (data: any) => {
          if (Array.isArray(data.usuarios)) {
            this.users = data.usuarios;
          } else {
            this.users = data.usuarios ? [data.usuarios] : [];
          }

          if (this.users.length === 0) {
            // Si no se encontró ningún usuario, obtener todos los usuarios
            this.ServiceLoginService.getAllUser().subscribe(
              (dataAll: any) => {
                if (Array.isArray(dataAll.usuarios)) {
                  this.users = dataAll.usuarios;
                } else {
                  this.users = dataAll.usuarios ? [dataAll.usuarios] : [];
                }
              },
              (errorAll) => {
                console.log(errorAll);
              }
            );
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'El usuario que busca no existe, Se listaran a todos los usuarios',
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
            },
            (error) => {
              console.log(error);
            }
          );
       
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Buscando a todos Usuarios',
        text: 'Estamos Listando a todos los Usuarios',
        confirmButtonText: 'OK'
      });
      this.ServiceLoginService.getAllUser().subscribe(
        (data: any) => {
          if (Array.isArray(data.usuarios)) {
            this.users = data.usuarios;
          } else {
            this.users = data.usuarios ? [data.usuarios] : [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


  getEstadoUsuario(estado: number): string {
    return estado === 1 ? 'Activo' : 'Desactivado';
  }

  RegisterUser() {
    this.router.navigate(['/registro-nuevo-usuario']);
  }

  UpdateStatus(){
    this.router.navigate(['/StatusUsers']);
  }

}
