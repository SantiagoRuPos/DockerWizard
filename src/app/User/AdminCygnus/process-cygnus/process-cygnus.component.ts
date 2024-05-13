import { Component } from '@angular/core';
import { CygnusService } from '../../../Services/cygnus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-process-cygnus',
  templateUrl: './process-cygnus.component.html',
  styleUrl: './process-cygnus.component.css'
})
export class ProcessCygnusComponent {
  process: any[] = [];
  constructor(private CygnusService:CygnusService){}

  Consultar() {
    this.CygnusService.ProcessCygnus().subscribe(
      (data: any) => {
        this.process = data.processes; // Se asigna 'data.users' en lugar de 'data.userList'
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
          title: "Procesos de Cygnus Listados"
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de al consultar',
          text: 'Hubo un problema al consultar los Procesos de Cygnus. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.'
        });
        console.error('Error al obtener los procesos:', error);
      }
    );
  }
}
