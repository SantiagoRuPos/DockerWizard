import { Component } from '@angular/core';
import { ServiceLoginService } from '../../../Services/service-login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent {
  proyects :any = [];
  Nombre_Proyecto:any;

  constructor(private ServiceLoginService:ServiceLoginService,private Router:Router){

  }

  Consulta(){
    if (this.Nombre_Proyecto && this.Nombre_Proyecto.trim() !== '') {
      this.ServiceLoginService.getProject(this.Nombre_Proyecto).subscribe(
        (data:any)=>{
          if (Array.isArray(data.Proyect)) {
            this.proyects=data.Proyect;
          }else{
            this.proyects=data.Proyect ? [data.projects]:[];
          }
          if (this.proyects.length === 0) {
            this.ServiceLoginService.getAllProjects().subscribe(
              (dataAll:any)=> {
                if(Array.isArray(dataAll.Proyects)){
                  this.proyects=dataAll.Proyects;
                }else{
                  this.proyects=dataAll.Proyects ? [dataAll.Proyects]:[];
                }
              },
            (errorAll)=> {
              console.log(errorAll)
            }
            )
          }
          
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Proyecto no encontrado',
            text: 'El Proyecto que busca no existe, Se listaran a todos los Proyectos',
            confirmButtonText: 'OK'
          });
          console.log(error);
          this.ServiceLoginService.getAllProjects().subscribe(
            (dataAll:any)=> {
              if(Array.isArray(dataAll.Proyects)){
                this.proyects=dataAll.Proyects;
              }else{
                this.proyects=dataAll.Proyects ? [dataAll.Proyects]:[];
              }
            },
          (errorAll)=> {
            console.log(errorAll),
            console.log(errorAll)
            Swal.fire({
              icon: 'error',
              title: '¡Ups! Ha ocurrido un error.',
              text: 'Se ha detectado un problema. Por favor, inténtalo de nuevo. Si el error persiste, por favor genera un reporte.',
              confirmButtonText: 'OK'
            });
          }
          )
        }
      )
    }else {
      Swal.fire({
        icon: 'info',
        title: 'Buscando todos proyectos',
        text: 'Estamos Listando todos los proyectos',
        confirmButtonText: 'OK'
      });
      this.ServiceLoginService.getAllProjects().subscribe(
        (dataAll:any)=> {
          if(Array.isArray(dataAll.Proyects)){
            this.proyects=dataAll.Proyects;
          }else{
            this.proyects=dataAll.Proyects ? [dataAll.Proyects]:[];
          }
        },
      (errorAll)=> {
        console.log(errorAll)
        Swal.fire({
          icon: 'error',
          title: '¡Ups! Ha ocurrido un error.',
          text: 'Se ha detectado un problema. Por favor, inténtalo de nuevo. Si el error persiste, por favor genera un reporte.',
          confirmButtonText: 'OK'
        });
      }
      )
    }
  }
GetEstado(estado:number):string{
  return estado === 1 ? 'Activado': 'Descatiado';
}
GetTipo(RolProyecto:number): string{
  return RolProyecto === 1 ? 'Proyecto de Investigación' : 'Proyecto de Grado';
}
GetFecha(fecha:string):string{
  const fechaFormateada = new Date(fecha).toLocaleDateString(); // Formatea la fecha
  return fechaFormateada;
}
GetFechaFinal(fecha: string): string {
  if (!fecha) {
    return fecha ? fecha : 'El proyecto aún se encuentra en desarrollo';
  }else {
    const fechaFormateada = new Date(fecha).toLocaleDateString(); // Formatea la fecha
    return fechaFormateada;
  }
 
}
GetPrograma(programa:number):string{
  switch (programa) {
    case 1:
      return 'Ingeniería Electrónica';
    case 2:
      return 'Ingeniería Industrial';
    case 3:
      return 'Ingeniería de Sistemas';
    case 4:
      return 'Tecnología en Electrónica Industrial';
    case 5:
      return 'Tecnología en Producción Industrial';
    case 6:
      return 'Tecnología en Sistemas de Información';
    default:
      return 'Programa académico no especificado';
  }

}

}
