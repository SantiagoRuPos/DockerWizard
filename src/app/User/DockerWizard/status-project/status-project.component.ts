import { Component } from '@angular/core';
import {ServiceLoginService} from '../../../Services/service-login.service';
import Swal from 'sweetalert2';
import { response } from 'express';
@Component({
  selector: 'app-status-project',
  templateUrl: './status-project.component.html',
  styleUrl: './status-project.component.css'
})
export class StatusProjectComponent {
  proyects: any[] = [];
  Nombre_Proyecto: string ='';
  estadoSeleccionado: string = 'Nuevo estado para el proyecto'; // Agregar una variable para guardar el estado seleccionado
  ProyectoActual: any = {};

  
  constructor(private ServiceLoginService:ServiceLoginService){

  }
  
  TraerProyectos(){
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

  seleccionarProyecto(nombreProyecto: string) {
    this.Nombre_Proyecto = nombreProyecto; // Actualiza Nombre_Usuario con el nombre seleccionado
  }

  guardarproyectoActual(proyecto: any) {
    this.ProyectoActual = proyecto;
  }
  getEstadoProyecto(estado: number): string {
    return estado === 1 ? 'Activo' : 'Desactivado';
  }
  
  cambiarEstado(){
    if (this.Nombre_Proyecto==='') {
      Swal.fire({
        icon: 'error',
        title: 'Ingresa un Nombre de proyecto',
        text: 'Por favor, Ingresa o seleciona un nombre de proyecto valido',
        confirmButtonText: 'OK'
      });
    } else {
      if (this.estadoSeleccionado === 'Seleciona el nuevo estado del proyecto') {
        Swal.fire({
          icon: 'warning',
          title: 'Seleccione un estado',
          text: 'Por favor, seleccione un estado válido',
          confirmButtonText: 'OK'
        });
        return; 
      } else if (this.estadoSeleccionado === '2') {
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
            this.ServiceLoginService.UpdateStatusProject(estadoNumero,this.Nombre_Proyecto).subscribe(
              response => {
                console.log('Proyecto actualizado exitosamente:', response);
                Swal.fire(
                  '¡Desactivado!',
                  'El proyecto ha sido desactivado.',
                  'success'
                );
                this.TraerProyectos();
              }
            )
          }
        });
      }else {
        //si es para activar
        const estadoNumero = parseInt(this.estadoSeleccionado);
        this.ServiceLoginService.UpdateStatusProject(estadoNumero,this.Nombre_Proyecto).subscribe(
          response => {
            console.log('Proyecto actualizado exitosamente:', response);
            Swal.fire(
              'Activado!',
              'El proyecto ha sido Activado.',
              'success'
            );
            this.TraerProyectos();
          }
        )
      }
    }   
  }

}
