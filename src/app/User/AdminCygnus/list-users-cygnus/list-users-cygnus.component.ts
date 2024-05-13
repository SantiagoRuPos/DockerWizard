import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CygnusService } from '../../../Services/cygnus.service';
@Component({
  selector: 'app-list-users-cygnus',
  templateUrl: './list-users-cygnus.component.html',
  styleUrl: './list-users-cygnus.component.css'
})
export class ListUsersCygnusComponent {
  users: any[] = [];
  constructor(private CygnusService:CygnusService){

  }
  Consultar() {
    this.CygnusService.ListUserCygnus().subscribe(
      (data: any) => {
        this.users = data.users; // Se asigna 'data.users' en lugar de 'data.userList'
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Usuarios de Cygnus Listados"
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de al consultar',
          text: 'Hubo un problema al consultar los usuarios con Cygnus. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.'
        });
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
}
