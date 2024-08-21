import { Component, OnInit } from '@angular/core';
import { CygnusService } from './../../Services/cygnus.service';
import {UsuarioInfoService} from '../../Services/usuario-info.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})

export class ReportsComponent implements OnInit{
  usuarios: any[] = [];
  reportes: any[] = [];
  searchText: string = '';
  selectedReporte: any = null;
  UsuarioRegistrador: string = '';

  constructor(private CygnusService: CygnusService,private  UsuarioInfoService:UsuarioInfoService) {}

  ngOnInit(): void {
   this.loadReportes();
   this.usuarios=this.UsuarioInfoService.getUsuarios();
   if (this.usuarios.length > 0) {
    this.UsuarioRegistrador = this.usuarios[0].Nombre_Completo_Usuario;
  }
  }

  loadReportes(): void {
    const params = { Nombre_Reporte: this.searchText }; // Puedes añadir otros parámetros de búsqueda aquí
    this.CygnusService.searchReportes(params).subscribe(
      (data: any) => {
        this.reportes = data;
      },
      (error) => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }

  onSearch(): void {
    this.loadReportes();
  }

  selectReporte(reporte: any): void {
    this.selectedReporte = reporte;
  }

  getNivelClass(nivel: number): string {
    switch (nivel) {
      case 1:
        return 'nivel-1'; // Azul claro
      case 2:
        return 'nivel-2'; // Amarillo claro
      case 3:
        return 'nivel-3'; // Rojo claro
      default:
        return ''; // Sin clase por defecto
    }
  }

  getBadgeClass(nivel: number): string {
    switch (nivel) {
      case 1:
        return 'bg-primary'; // Azul
      case 2:
        return 'bg-warning'; // Amarillo
      case 3:
        return 'bg-danger'; // Rojo
      default:
        return ''; // Sin clase por defecto
    }
  }

  getNivelLabel(nivel: number): string {
    switch (nivel) {
      case 1:
        return 'Alto'; // Cambia esto según tu necesidad
      case 2:
        return 'Medio'; // Cambia esto según tu necesidad
      case 3:
        return 'Bajo'; // Cambia esto según tu necesidad
      default:
        return 'Desconocido'; // Cambia esto según tu necesidad
    }
  }
 
  crearNuevoReporte() {
    Swal.fire({
      title: 'Crear Nuevo Reporte',
      html:
        `<input id="reporte-titulo" class="swal2-input custom-input" placeholder="Título del reporte">` +
        `<textarea id="reporte-descripcion" class="swal2-textarea custom-textarea" placeholder="Descripción del reporte"></textarea>` +
        `<select id="reporte-nivel" class="swal2-select custom-select">
          <option value="" disabled selected>Selecciona el nivel del reporte</option>
          <option value="Nivel 1">Nivel 1</option>
          <option value="Nivel 2">Nivel 2</option>
          <option value="Nivel 3">Nivel 3</option>
        </select>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
        title: 'custom-title'
      },
      preConfirm: () => {
        const titulo = (document.getElementById('reporte-titulo') as HTMLInputElement).value;
        const descripcion = (document.getElementById('reporte-descripcion') as HTMLTextAreaElement).value;
        const nivel = (document.getElementById('reporte-nivel') as HTMLSelectElement).value;

        if (!titulo || !descripcion || !nivel) {
          Swal.showValidationMessage('Por favor, completa todos los campos.');
          return false;
        }

        return { titulo, descripcion, nivel };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { titulo, descripcion, nivel } = result.value!;
        const usuarioRegistrador = this.UsuarioRegistrador; // Aquí deberías obtener el usuario registrador real

        const reportData = {
          Nombre_Reporte: titulo,
          Descripcion_Reporte: descripcion,
          Nivel_Reporte: nivel,
          Usuario_Registrador_Reporte: usuarioRegistrador
        };

        this.CygnusService.newReport(reportData).subscribe(response => {
          console.log('Reporte creado exitosamente:', response);
          Swal.fire('¡Éxito!', 'El reporte ha sido creado exitosamente.', 'success');
          this.loadReportes();
        }, error => {
          console.error('Error al crear el reporte:', error);
          Swal.fire('Error', 'Hubo un problema al crear el reporte. Inténtalo nuevamente.', 'error');
        });
      }
    });
  }
}