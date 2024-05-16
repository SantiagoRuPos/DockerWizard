import { Component } from '@angular/core';
import { CygnusService } from '../../../Services/cygnus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monitor-user-cygnus',
  templateUrl: './monitor-user-cygnus.component.html',
  styleUrl: './monitor-user-cygnus.component.css'
})
export class MonitorUserCygnusComponent {
  users: any[] = [];
  constructor(private CygnusService:CygnusService){}

  ngOnInit() {
    this.monitorUsers();
  }
  monitorUsers() {
    this.CygnusService.monitorUsers().subscribe(
      (data: any) => {
        this.users = data.users;
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
          title: "Usuarios Conectados en Cynugs"
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de al consultar',
          text: 'Hubo un problema al consultar los usuarios con Cygnus. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.'
        });
        console.error('Error al obtener la lista de usuarios:', error);
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
}
