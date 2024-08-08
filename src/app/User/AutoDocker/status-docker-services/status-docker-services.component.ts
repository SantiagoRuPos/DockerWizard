import { Component, OnInit } from '@angular/core';
import { DockerService } from '../../../Services/docker.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-status-docker-services',
  templateUrl: './status-docker-services.component.html',
  styleUrls: ['./status-docker-services.component.css']
})
export class StatusDockerServicesComponent implements OnInit {
  containers: any[] = [];
  nombreContenedor: any;

  constructor(private dockerService: DockerService,private router: Router) {}

  ngOnInit(): void {
    this.consultar();
  }

  consultar() {
    this.dockerService.StateContainers().subscribe(
      (data: any) => {
        this.containers = data.containers;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Contenedores de Cygnus Listados'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al consultar',
          text: 'Hubo un problema al consultar los Contenedores de Cygnus. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.'
        });
        console.error('Error al obtener la lista de Contenedores:', error);
      }
    );
  }

  promptForContainer() {
    Swal.fire({
      title: 'Ingrese el nombre del contenedor',
      input: 'text',
      inputPlaceholder: 'Nombre del contenedor',
      showCancelButton: true,
      confirmButtonText: 'Reiniciar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡Necesitas ingresar un nombre de contenedor!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmRestart(result.value);
      }
    });
  }

  confirmRestart(nombreContenedor: string) {
    Swal.fire({
      title: `¿Está seguro de que desea reiniciar el contenedor ${nombreContenedor}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, reiniciar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restartContainer(nombreContenedor);
      }
    });
  }

  restartContainer(nombreContenedor: string) {
    this.dockerService.DockerRestart(nombreContenedor).subscribe(
      response => {
        console.log("Logs: ", response);
        Swal.fire({
          icon: 'success',
          title: 'Contenedor reiniciado',
          text: `El contenedor ${nombreContenedor} se reinició exitosamente.`
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al reiniciar',
          text: `Hubo un problema al reiniciar el contenedor ${nombreContenedor}. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.`
        });
        console.error('Error al reiniciar el Contenedor:', error);
      }
    );
  }

  updatedorContainer() {
    Swal.fire({
      title: 'Ingrese el nombre del contenedor',
      input: 'text',
      inputPlaceholder: 'Nombre del contenedor',
      showCancelButton: true,
      confirmButtonText: 'Instalar dependecnias',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡Necesitas ingresar un nombre de contenedor!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmUpdatet(result.value);
      }
    });
  }

  confirmUpdatet(nombreContenedor: string) {
    Swal.fire({
      title: `¿Está seguro de que desea instalar las dependencias al contenedor ${nombreContenedor}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, instalar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UpdateContainer(nombreContenedor);
      }
    });
  }
UpdateContainer(nombreContenedor: string) {
    this.dockerService.UpdatesContenedores(nombreContenedor).subscribe(
      response => {
        console.log("Logs: ", response);
        Swal.fire({
          icon: 'success',
          title: 'Dependencias Instaladas y actualizadas',
          text: `Las dependecias de ${nombreContenedor} se instalaron correctamente.`
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al instalar',
          text: `Hubo un problema al intentar instalar las dependencias del contenedor ${nombreContenedor}. Por favor, inténtalo de nuevo. Si el error persiste, revisa el terminal o reporta el fallo.`
        });
        console.error('Error al instalar dependencias de php y mysql:', error);
      }
    );
  }
  DockerLogs(){
    this.router.navigate(['/DockerLogs']);
  }
}