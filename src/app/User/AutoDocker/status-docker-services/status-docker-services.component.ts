import { Component, OnInit } from '@angular/core';
import {DockerService} from '../../../Services/docker.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-status-docker-services',
  templateUrl: './status-docker-services.component.html',
  styleUrl: './status-docker-services.component.css'
})
export class StatusDockerServicesComponent  {
  containers: any[] = [];
constructor(private DockerService:DockerService){}


consultar(){
  this.DockerService.StateContainers().subscribe(
    (data:any)=> {
      this.containers = data.containers;
     
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
  )
}
}




