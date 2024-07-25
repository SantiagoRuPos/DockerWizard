import { Component } from '@angular/core';
import { DockerService } from "../../../Services/docker.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-docker-up',
  templateUrl: './docker-up.component.html',
  styleUrl: './docker-up.component.css'
})
export class DockerUpComponent {
  constructor(private DockerService:DockerService){}
  DockerUp(){
    this.DockerService.DockerUp().subscribe(
      response => {
        console.log('Los servicios se establecieron exisitosamente.', response);
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
          title: "¡Servicios Restablecidos!",
          text: "Los servicios se han ejecutado correctamente",  
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error de levantar los dockers',
          text: "No se pudo alzar los dockers. Inténtalo nuevamente. Si el error persiste, revisa la consola."
        });
        console.error('Error al subir los dockers', error);
     
      }
    )
  }
}
