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
  codigoReporteSeleccionado: string | number = ''; // Variable para guardar el código del reporte seleccionado
  Correo_Institucional_Usuario:string = '';
  constructor(private CygnusService: CygnusService,private  UsuarioInfoService:UsuarioInfoService) {}

  ngOnInit(): void {
   this.loadReportes();
   this.usuarios=this.UsuarioInfoService.getUsuarios();
   if (this.usuarios.length > 0) {
    this.UsuarioRegistrador = this.usuarios[0].Nombre_Usuario;
    this.Correo_Institucional_Usuario = this.usuarios[0].Correo_Institucional_Usuario;
    console.log(this.usuarios[0].Correo_Institucional_Usuario)
  }
  }

  loadReportes(): void {
    const params = { searchText: this.searchText }; // Pasa el texto de búsqueda al backend
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
    this.selectedReporte = reporte;
    this.codigoReporteSeleccionado = reporte.Id_Reporte; // Guarda el código del reporte seleccionado
    console.log('Código del reporte seleccionado:', this.codigoReporteSeleccionado);
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
        const Correo_Institucional_Usuario =this. Correo_Institucional_Usuario;
        const reportData = {
          Nombre_Reporte: titulo,
          Descripcion_Reporte: descripcion,
          Nivel_Reporte: nivel,
          Usuario_Registrador_Reporte: usuarioRegistrador,
          Correo_Institucional_Usuario: Correo_Institucional_Usuario
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

  modificarReporte() {
    if (!this.selectedReporte) {
      Swal.fire('Error', 'No hay ningún reporte seleccionado.', 'error');
      return;
    }
  
    Swal.fire({
      title: 'Modificar Reporte',
      html:
        `<select id="reporte-nivel" class="swal2-select custom-select">
          <option value="" disabled>Selecciona el nivel del reporte</option>
          <option value="Nivel 1" ${this.selectedReporte.Nivel_Reporte === 'Nivel 1' ? 'selected' : ''}>Nivel 1</option>
          <option value="Nivel 2" ${this.selectedReporte.Nivel_Reporte === 'Nivel 2' ? 'selected' : ''}>Nivel 2</option>
          <option value="Nivel 3" ${this.selectedReporte.Nivel_Reporte === 'Nivel 3' ? 'selected' : ''}>Nivel 3</option>
        </select>` +
        `<select id="reporte-estado" class="swal2-select custom-select mt-2">
          <option value="" disabled>Selecciona el estado del reporte</option>
          <option value="Pendiente" ${this.selectedReporte.Estado_Reporte === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="Revision" ${this.selectedReporte.Estado_Reporte === 'Revision' ? 'selected' : ''}>Revision</option>
          <option value="Solucionado" ${this.selectedReporte.Estado_Reporte === 'Solucionado' ? 'selected' : ''}>Solucionado</option>
        </select>` +
        `<textarea id="reporte-comentario" class="swal2-textarea custom-textarea mt-2" placeholder="Comentario de solución (si aplica)" style="display: none;"></textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Modificar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
        title: 'custom-title'
      },
      didOpen: () => {
        const estadoSelect = document.getElementById('reporte-estado') as HTMLSelectElement;
        const comentarioTextarea = document.getElementById('reporte-comentario') as HTMLTextAreaElement;
  
        estadoSelect.addEventListener('change', () => {
          if (estadoSelect.value === 'Solucionado') {
            comentarioTextarea.style.display = 'block';
          } else {
            comentarioTextarea.style.display = 'none';
          }
        });
  
        if (estadoSelect.value === 'Solucionado') {
          comentarioTextarea.style.display = 'block';
        }
      },
      preConfirm: () => {
        const nivel = (document.getElementById('reporte-nivel') as HTMLSelectElement).value;
        const estado = (document.getElementById('reporte-estado') as HTMLSelectElement).value;
        const comentario = (document.getElementById('reporte-comentario') as HTMLTextAreaElement).value;
  
        if (!nivel || !estado) {
          Swal.showValidationMessage('Por favor, completa todos los campos requeridos.');
          return false;
        }
  
        if (estado === 'Solucionado' && !comentario) {
          Swal.showValidationMessage('Por favor, ingrese un comentario para el reporte solucionado.');
          return false;
        }
  
        return { nivel, estado, comentario };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nivel, estado, comentario } = result.value!;
        const usuarioRegistrador = this.UsuarioRegistrador; // Reemplazar con el usuario actual
        const Correo_Institucional_Usuario =this. Correo_Institucional_Usuario;
        // Construir el objeto con todas las propiedades requeridas
        const updatedReportData = {
          Id_Reporte: this.selectedReporte.Id_Reporte,
          Nivel_Reporte: nivel, // Se envía el texto como 'Nivel 1', 'Nivel 2', 'Nivel 3'
          Estado_Reporte: estado,
          Usuario_Solucionador_Reporte: usuarioRegistrador,
          Comentarios_Reporte: comentario || '',
          Correo_Institucional_Usuario: Correo_Institucional_Usuario
        };
  
        this.CygnusService.UpdateReport(updatedReportData).subscribe(response => {
          console.log('Reporte modificado exitosamente:', response);
          Swal.fire('¡Éxito!', 'El reporte ha sido modificado exitosamente.', 'success');
          this.loadReportes();
        }, error => {
          console.error('Error al modificar el reporte:', error);
          Swal.fire('Error', 'Hubo un problema al modificar el reporte. Inténtalo nuevamente.', 'error');
        });
      }
    });
  }
  
  

}