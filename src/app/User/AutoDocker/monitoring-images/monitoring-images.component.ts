import { Component, OnInit } from '@angular/core';
import {DockerService} from '../../../Services/docker.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-monitoring-images',
  templateUrl: './monitoring-images.component.html',
  styleUrl: './monitoring-images.component.css'
})
export class MonitoringImagesComponent implements OnInit{
  containers: any[] = [];
constructor(private DockerService:DockerService){}
  ngOnInit(): void {
    this.consultar();
  }
  consultar(){
    this.DockerService.MonitoringImages().subscribe(
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
          title: "Contenedores de Cygnus Listados"
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de al consultar',
          text: 'Hubo un problema al consultar los Contenedores de Cygnus. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.'
        });
        console.error('Error al obtener la lista de Contenedores:', error);
      }
    )
  }
}
